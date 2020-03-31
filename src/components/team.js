import React from 'react'
import {
    Button, Col, Container,
    Input, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader, Row, Spinner,
} from "reactstrap";
import Chat from "./chat";
import {Link} from "react-router-dom";


class Team extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerNameInput: "",
            playerName: null,
        }
    }

    onPlayerNameInput(newValue) {
        this.setState({
            playerNameInput: newValue
        })
    }

    playerNameChosen() {
        this.setState({
            playerName: this.state.playerNameInput,
            playerNameInput: "",
        })
    }

    render() {
        const playerName = this.state.playerName;
        if (playerName == null) {
            return (
                <Modal isOpen autoFocus={false} className={this.props.className}>
                    <ModalHeader>Specify name</ModalHeader>
                    <ModalBody>
                        <Input type="text"
                               autoFocus
                               onChange={(event) => this.onPlayerNameInput(event.target.value)}
                               placeholder="Please input your desired player name"/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary"
                                disabled={this.state.playerNameInput.length <= 0}
                                onClick={() => {
                                    this.playerNameChosen();
                                }}>Join</Button>
                        <Button color="muted" tag={Link} to="/">Go back</Button>
                    </ModalFooter>
                </Modal>
            );
        }
        const team = this.props.team;
        const heroStats = this.props.heroStats;
        if (team == null || heroStats == null) {
            return (
                <div>
                    <h1>Loading teams...</h1>
                    <Spinner color="primary"/>
                </div>
            )
        }

        const teamName = this.props.teamName;
        const drafts = team["draft"].map(entry => {
            return <Row>
                <Col>
                    {entry["player"]}
                </Col>
                {entry["heroes"].map(hero => <Col>{heroStats[hero]["localized_name"]}</Col>)}
            </Row>;
        });

        return (
            <Container>
                {drafts}
                <Row>
                    <Col>
                        <h2>Chat</h2>
                        <Chat db={this.props.db}
                              player={this.state.playerName}
                              team={teamName}
                              messages={this.props.messages}/>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Team
