import firebase from 'firebase/app';
import 'firebase/firestore'

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

    static HERO_STATS_COLLECTION = "hero_stats";

    constructor(onHeroStatsAvailable, onGameChanged, onNewGame) {
        firebase.initializeApp(this.config);
        this.db = firebase.firestore();

        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            // Access testing game collection
            console.log("Using test game collection");
            this.gameCollectionName = "game_test";
            this.heroStatsDocument = "hero_stats_test";
        } else {
            // Access production game collection
            console.log("Using production game collection");
            this.gameCollectionName = "game";
            this.heroStatsDocument = "hero_stats";
        }

        // Create references to collections
        this.gameCollection = this.db.collection(this.gameCollectionName);
        this.heroStatsCollection = this.db.collection(Backend.HERO_STATS_COLLECTION);

        this.gameDoc = null;
        this.gameCollection
            .orderBy("timestamp")
            .limitToLast(1)
            .onSnapshot(games => {
                games.docs.forEach(doc => {
                    const newGame = this.gameDoc == null ? false : this.gameDoc.id !== doc.id;
                    this.gameDoc = doc.ref;
                    if (newGame) {
                        onNewGame();
                    }
                    onGameChanged(doc.data());
                });
            }, error => console.log(error));

        // Fetch the actual dota 2 data that was cached in firebase
        this.heroStats = null;
        this.heroStatsCollection.doc(this.heroStatsDocument).get()
            .then(doc => {
                const stats = doc.data()["stats"];
                this.heroStats = stats;
                onHeroStatsAvailable(stats);
            })
            .catch(reason => {
                // If the backend completely fails, fall back on API data
                console.log("Error while loading hero stats from backend: " + reason);
                this.getUpdatedHeroStats()
                    .then(updatedHeroStats => {
                        console.log("FALLING BACK TO UPDATED HERO STATS");
                        this.heroStats = updatedHeroStats;
                        onHeroStatsAvailable(updatedHeroStats);
                    });
            });
    }

    getUpdatedHeroStats() {
        return fetch("https://api.opendota.com/api/heroStats")
            .then(result => result.json());
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

    setReady(teamName, ready) {
        const path = `teams.${teamName}.ready`;
        this.gameDoc.update(path, ready)
            .catch(reason => console.log(reason));
    }

    startNewGame() {
        if (this.heroStats === null) {
            console.log("Cannot create new game - hero stats not loaded yet");
            return;
        }

        // Sort into a lists of int, str and agi
        let mappedHeroes = {int: [], str: [], agi: [], all: []};
        this.heroStats.forEach(hero => {
            const heroAttribute = hero['primary_attr'];
            mappedHeroes[heroAttribute].push(hero)
        });

        const draft = () => {
            return [
                this.randomSamplePop(mappedHeroes["int"])["id"],
                this.randomSamplePop(mappedHeroes["str"])["id"],
                this.randomSamplePop(mappedHeroes["agi"])["id"],
                this.randomSamplePop(mappedHeroes["all"])["id"]
            ]
        };

        let createTeam = () => {
            return {
                ready: false,
                players: [],
                chat: [],
                draft: {
                    0: draft(),
                    1: draft(),
                    2: draft(),
                    3: draft(),
                    4: draft(),
                    5: draft(),
                    6: draft(),
                },
                selectedHeroes: {
                    0: null,
                    1: null,
                    2: null,
                    3: null,
                    4: null,
                    5: null,
                    6: null
                }
            }
        };

        const cacheHeroStats = (updatedHeroStats) => {
            // Mirror the Dota 2 hero data to our backend
            return this.heroStatsCollection
                .doc(this.heroStatsDocument)
                .set({stats: updatedHeroStats})
                .then(() => {
                    console.log("Hero stats cached to backend");
                });
        };

        const createNewGame = () => {
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
        };

        // Try to fetch updated dota 2 data for caching
        const updatedHeroStatsPromise = this.getUpdatedHeroStats()
            .then(updatedHeroStats => {
                console.log("Loaded updated hero stats from API");
                return cacheHeroStats(updatedHeroStats);
            })
            .catch(reason => {
                console.log("Failed getting hero stats: " + reason + ". Falling back to cached data");
                return this.heroStats
            });

        // Timeout if updating the cached hero stats is taking too long, and just use the current stats instead
        const timeoutPromise = new Promise((resolve, reject) => {
            let id = setTimeout(() => {
                clearTimeout(id);
                resolve(this.heroStats)
            }, 5000)
        });

        Promise.race([updatedHeroStatsPromise, timeoutPromise])
            .then(createNewGame)
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
