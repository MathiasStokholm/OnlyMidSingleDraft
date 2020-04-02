import React from 'react'
import {
    Button, Card, CardBody, CardHeader, CardImg, CardSubtitle, CardText, CardTitle, Col, Container,
    Input, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader, Row, Spinner,
} from "reactstrap";
import Chat from "./chat";
import {Link} from "react-router-dom";
import {firebase} from "../firebase";


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
        const chosenPlayerName = this.state.playerNameInput;
        this.setState({
            playerName: chosenPlayerName,
            playerNameInput: "",
        });

        let gameDocRef = this.props.db.collection("game").doc("9op54o2N9uJEfyuHb5B3");
        const path = "teams." + this.props.teamName + ".players";
        gameDocRef.update(path, firebase.firestore.FieldValue.arrayUnion(chosenPlayerName));
    }

    convertToApiPath(path) {
        return "https://api.opendota.com" + path
    }

    render() {
        // Show modal to allow picking player name if needed
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

        // If team is undefined, just show a loading screen
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
        const players = team["players"];

        // Look up a hero based on its ID in the dataset (rather than the index in the JSON array)
        const findHero = (idx) => {
            return heroStats.filter(hero => hero["id"] === idx)[0];
        };

        const createPlayerRow = (player, hero_ids) => {
            return (
                <Row style={{"max-width": "600px", "margin": "0 auto"}}>
                    <Col>
                        <h2>{player}</h2>
                    </Col>
                    {hero_ids.map(hero_id => {
                        const hero = findHero(hero_id);
                        return (
                            <Col style={{"padding": "5px"}}>
                                <Card>
                                    <CardImg top src={this.convertToApiPath(hero['img'])}
                                             alt="hero image"/>
                                    <CardBody style={{
                                        "padding": "0px",
                                        "textAlign": "center"
                                    }}>{hero['localized_name']}</CardBody>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            );
        };

        // Look up drafts for players on team
        let drafts = [];
        for (let index = 0; index < players.length; index++) {
            const player = players[index];
            const hero_ids = team["draft"][index.toString()];
            drafts.push(createPlayerRow(player, hero_ids));
        }

        return (
            <Container>
                {drafts}
                <Row>
                    <Col>
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
