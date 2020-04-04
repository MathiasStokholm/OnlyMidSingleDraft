import firebase from 'firebase/app';
import 'firebase/firestore'

// The current game we reuse
const GAME = "game";

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

    constructor(onHeroStatsAvailable, onGameChanged, onNewGame) {
        firebase.initializeApp(this.config);
        this.db = firebase.firestore();
        this.gameCollection = this.db.collection(GAME);
        this.gameDoc = null;

        this.gameCollection
            .orderBy("timestamp")
            .limitToLast(1)
            .onSnapshot(games => {
                games.docs.forEach(doc => {
                    const newGame = this.gameDoc == null? false: this.gameDoc.id !== doc.id;
                    this.gameDoc = doc.ref;
                    if (newGame) {
                        onNewGame();
                    }
                    onGameChanged(doc.data());
                });
            }, error => console.log(error));

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

    convertToApiPath(path) {
        return "https://api.opendota.com" + path
    }

    sendChatMessage(team, player, message) {
        const path = "teams." + team + ".chat";
        this.gameDoc.update(path, firebase.firestore.FieldValue.arrayUnion({
            "timestamp": firebase.firestore.Timestamp.fromDate(new Date()),
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
        this.gameDoc.update(path, heroId)
            .catch(reason => console.log(reason));
    }

    startNewGame() {
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

        // Create a new game!
        this.gameCollection.add({
            timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
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
