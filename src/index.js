import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import Backend from './backend';
import * as serviceWorker from './serviceWorker';
import Header from "./components/header";
import Welcome from "./components/welcome";
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
            heroStats: null,
            readiness: {
                radiant: false,
                dire: false
            }
        };

        this.backend = new Backend((heroStats) => {
            this.setState({
                heroStats: heroStats
            })
        }, (game) => {
            const teams = game["teams"];
            this.setState({
                teams: teams,
                radiantTeam: teams["radiant"],
                direTeam: teams["dire"],
                radiantMessages: teams["radiant"]["chat"],
                direMessages: teams["dire"]["chat"],
                readiness: {
                    radiant: teams["radiant"]["ready"],
                    dire: teams["dire"]["ready"]
                }
            })
        }, () => {
            console.log("New game detected - forcing all players back to welcome screen");
            this.router.history.push("/");
        });
    };

    render() {
        return (
            <HashRouter basename="/" ref={(router) => { this.router = router; }}>
                <div>
                    <Header backend={this.backend}/>
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
                                                            backend={this.backend}
                                                            teamName="radiant"
                                                            team={this.state.radiantTeam}
                                                            readiness={this.state.readiness}
                                                            heroStats={this.state.heroStats}
                                                            messages={this.state.radiantMessages}/>}
                            />
                            <Route exact
                                   path='/dire'
                                   render={(props) => <Team {...props}
                                                            backend={this.backend}
                                                            teamName="dire"
                                                            team={this.state.direTeam}
                                                            readiness={this.state.readiness}
                                                            heroStats={this.state.heroStats}
                                                            messages={this.state.direMessages}/>}
                            />
                            <Route render={(props) => <Welcome {...props} teams={this.state.teams}/>}/>
                        </Switch>
                    </Main>
                </div>
            </HashRouter>
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
