import React from 'react'
import {Link} from 'react-router-dom';
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink, Modal, ModalHeader, ModalFooter, Button
} from 'reactstrap';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newGameDialogShowing: false
        };
    }

    toggleNewGameDialog() {
        this.setState({
            newGameDialogShowing: !this.state.newGameDialogShowing
        })
    }

    startNewGameClicked() {
        this.setState({
            newGameDialogShowing: true
        })
    }

    render() {
        const heroStatsReady = this.props.heroStats != null;

        return (
            <div>
                <Modal isOpen={this.state.newGameDialogShowing} className={this.props.className}
                       toggle={() => this.toggleNewGameDialog()}>
                    <ModalHeader>Really start new game?</ModalHeader>
                    <ModalFooter>
                        <Button color="primary" onClick={() => {
                            this.props.backend.startNewGame();
                            this.toggleNewGameDialog();
                        }}>Yes!</Button>
                        <Button color="muted" onClick={() => this.toggleNewGameDialog()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Navbar color="dark" className="navbar-dark" expand="md" style={{marginBottom: '5px'}}>
                    <NavbarBrand tag={Link} to="/">Only Mid Single Draft</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/old">Old App</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/" disabled={!heroStatsReady} onClick={(event) => {
                                event.preventDefault();
                                this.startNewGameClicked();
                            }}>Start New Game</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default Header
