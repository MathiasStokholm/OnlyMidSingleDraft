import React from 'react'
import { Link, withRouter } from 'react-router-dom';
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
        let createTeam = () => {
            return {
                players: ["gedged", "misged"],
                chat: [],
                draft: [
                    {
                        player: "gedged",
                        heroes: [2, 17, 32]
                    },
                    {
                        player: "misged",
                        heroes: [42, 43, 44]
                    }
                ]
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
            });
    }

    render() {
         return (
            <Navbar color="dark" className="navbar-dark" expand="md" style={{marginBottom: '5px'}}>
                <NavbarBrand tag={Link} to="/">Only Mid Single Draft</NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/old">Old App</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/" onClick={(event) => {
                            this.startNewGame()
                        }}>Start New Game</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default withRouter(Header)
