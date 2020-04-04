import firebase from 'firebase';

// The current game we reuse
const GAME_ID = "9op54o2N9uJEfyuHb5B3";

class Backend {
    config = {
        apiKey: "AIzaSyCVXi7MSmaFcSDtvK2eYdpggzQgbHOf_dk",
        authDomain: "onlymid-6adbf.firebaseapp.com",
        databaseURL: "https://onlymid-6adbf.firebaseio.com",
        projectId: "onlymid-6adbf",
        storageBucket: "onlymid-6adbf.appspot.com",
        messagingSenderId: "464340805319",
        appId: "1:464340805319:web:65283996aefc809d2800e2"
    };

    constructor(onHeroStatsAvailable) {
        firebase.initializeApp(this.config);
        this.db = firebase.firestore();
        this.gameDoc = this.db.collection("game").doc(GAME_ID);

        // Fetch the actual dota 2 data
        this.heroStats = null;
        fetch("https://api.opendota.com/api/heroStats")
            .then(res => res.json())
            .then(result => {
                this.heroStats = result;
                onHeroStatsAvailable(result);
            })
            .catch(reason => console.log(reason));
    }


    listenForChanges(onGameChangedFunc) {
        this.gameDoc.onSnapshot(doc => {
            onGameChangedFunc(doc.data());
        });
    }

    convertToApiPath(path) {
        return "https://api.opendota.com" + path
    }

    sendChatMessage(team, player, message) {
        const path = "teams." + team + ".chat";
        this.gameDoc.update(path, firebase.firestore.FieldValue.arrayUnion({
            "timestamp": new Date().toString(),
            "player": player,
            "message": message,
        }))
            .catch(reason => console.log(reason));
    }

    setPlayerName(teamName, playerName) {
        const path = "teams." + teamName + ".players";
        this.gameDoc.update(path, firebase.firestore.FieldValue.arrayUnion(playerName))
            .catch(reason => console.log(reason));
    }

    setSelectedHero(teamName, playerIndex, heroId) {
        const path = `teams.${teamName}.selectedHeroes.${playerIndex}`;
        console.log(teamName, playerIndex, heroId, path);
        this.gameDoc.update(path, heroId)
            .catch(reason => console.log(reason));
    }

    startNewGame() {
        // TODO: Add dialog here to avoid mistakes when clicking new game
        if (this.heroStats === null) {
            console.log("Cannot create new game - hero stats not loaded yet");
            return;
        }

        // Sort into a lists of int, str and agi
        let mappedHeroes = {int: [], str: [], agi: []};
        this.heroStats.forEach(hero => {
            const heroAttribute = hero['primary_attr'];
            mappedHeroes[heroAttribute].push(hero)
        });

        const draft = () => {
            return [
                this.randomSamplePop(mappedHeroes["int"])["id"],
                this.randomSamplePop(mappedHeroes["str"])["id"],
                this.randomSamplePop(mappedHeroes["agi"])["id"]
            ]
        };

        let createTeam = () => {
            return {
                players: [],
                chat: [],
                draft: {
                    0: draft(),
                    1: draft(),
                    2: draft(),
                    3: draft(),
                    4: draft(),
                },
                selectedHeroes: {
                    0: null,
                    1: null,
                    2: null,
                    3: null,
                    4: null,
                }
            }
        };

        // TODO: Replace this with something that creates a new game instead of overwriting old one
        this.gameDoc.set({
            teams: {
                radiant: createTeam(),
                dire: createTeam(),
            }
        })
            .then(() => console.log("Created new game!"))
            .catch(reason => console.log(reason));

    }

    randomSamplePop(items) {
        const idx = Math.floor(Math.random() * items.length);
        const sample = items[idx];
        items.splice(idx, 1);
        return sample;
    }
}

export default Backend;
