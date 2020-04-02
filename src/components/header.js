import React from 'react'
import {Link, withRouter} from 'react-router-dom';
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    startNewGame() {
        // TODO: Add dialog here to avoid mistakes when clicking new game
        const heroStats = this.props.heroStats;

        // Sort into a lists of int, str and agi
        let mappedHeroes = {int: [], str: [], agi: []};
        heroStats.forEach(hero => {
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
                }
            }
        };

        // TODO: Replace this with something that creates a new game instead of overwriting old one
        this.props.db.collection("game")
            .doc("9op54o2N9uJEfyuHb5B3")
            .set({
                teams: {
                    radiant: createTeam(),
                    dire: createTeam(),
                }
            }).then(() => console.log("Created new game!")).catch(reason => console.log(reason));

    }

    randomSamplePop(items) {
        const idx = Math.floor(Math.random() * items.length);
        const sample = items[idx];
        items.splice(idx, 1);
        return sample;
    }

    render() {
        const heroStatsReady = this.props.heroStats != null;

        return (
            <Navbar color="dark" className="navbar-dark" expand="md" style={{marginBottom: '5px'}}>
                <NavbarBrand tag={Link} to="/">Only Mid Single Draft</NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/old">Old App</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/" disabled={!heroStatsReady} onClick={(event) => {
                            event.preventDefault();
                            this.startNewGame();
                        }}>Start New Game</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default withRouter(Header)
