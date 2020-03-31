import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import {firebase, Firebase, FirebaseContext} from './firebase';
import * as serviceWorker from './serviceWorker';
import Header from "./components/header";
import Welcome from "./components/welcome";
import Chat from "./components/chat";
import Team from "./components/team";
import MainScreen from "./MainScreen";

const Main = styled.div`
  max-width: 1024px;
  margin: 0 auto; // Center in website
`;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: null,
            radiantMessages: [],
            direMessages: [],
            heroStats: null
        };

        this.fb = new Firebase();
        this.db = firebase.firestore();

        // The current game we reuse
        const GAME_ID = "9op54o2N9uJEfyuHb5B3";

        this.db.collection("game").doc(GAME_ID).onSnapshot(doc => {
            const teams = doc.data()["teams"];
            this.setState({
                teams: teams,
                radiantTeam: teams["radiant"],
                direTeam: teams["dire"],
                radiantMessages: teams["radiant"]["chat"],
                direMessages: teams["dire"]["chat"],
            })
        });

        // Fetch the actual dota 2 data
        fetch("https://api.opendota.com/api/heroStats")
            .then(res => res.json())
            .then(result => {
                this.setState({
                    heroStats: result
                });
            });
    };

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header db={this.db}/>
                    <Main>
                        <Switch>
                            <Route exact
                                   path='/'
                                   render={(props) => <Welcome {...props} teams={this.state.teams}/>}
                            />
                            <Route exact
                                   path='/old'
                                   render={(props) => <MainScreen {...props}/>}
                            />
                            <Route exact
                                   path='/radiant'
                                   render={(props) => <Team {...props}
                                                            db={this.db}
                                                            teamName="radiant"
                                                            team={this.state.radiantTeam}
                                                            heroStats={this.state.heroStats}
                                                            messages={this.state.radiantMessages}/>}
                            />
                            <Route exact
                                   path='/dire'
                                   render={(props) => <Team {...props}
                                                            db={this.db}
                                                            teamName="dire"
                                                            team={this.state.direTeam}
                                                            heroStats={this.state.heroStats}
                                                            messages={this.state.direMessages}/>}
                            />
                        </Switch>
                    </Main>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render((
        <App/>
    ),
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
