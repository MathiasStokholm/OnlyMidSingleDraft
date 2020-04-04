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
        this.props.backend.startNewGame();
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
