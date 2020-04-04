import React from 'react'
import {
    Button, Card, CardImg, Col, Container,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader, Row, Spinner, CardHeader,
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
        const chosenPlayerName = this.state.playerNameInput;
        this.setState({
            playerName: chosenPlayerName,
            playerNameInput: "",
        });

        this.props.backend.setPlayerName(this.props.teamName, chosenPlayerName);
    }

    convertToApiPath(path) {
        return "https://api.opendota.com" + path
    }

    render() {
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

        // Show modal to allow picking player name if needed
        const playerName = this.state.playerName;
        const players = team["players"];
        if (playerName == null) {
            // Navigate back to index if team is full
            if (players.length >= 5) {
                this.props.history.push("/")
            }

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

        const teamName = this.props.teamName;

        // Look up a hero based on its ID in the dataset (rather than the index in the JSON array)
        const findHero = (idx) => {
            return heroStats.filter(hero => hero["id"] === idx)[0];
        };

        const createPlayerRow = (player, hero_ids) => {
            return (
                <Row style={{"marginBottom": "10px"}}>
                    <div style={{"width": "100%", "textAlign": "center"}}>
                        <Col>
                            <h5 style={{"marginBottom": "2px"}}>{player}</h5>
                        </Col>
                    </div>
                    <Row style={{"marginLeft": "0px", "marginRight": "0px"}}>
                        {hero_ids.map(hero_id => {
                            const hero = findHero(hero_id);
                            const tooltipId = "Card_" + player + hero_id;
                            return (
                                <Col xs="4" style={{"padding": "2px"}}>
                                    <Card href="#" id={tooltipId}>
                                        <CardImg top src={this.convertToApiPath(hero['img'])}
                                                 alt="hero image"/>
                                         <CardHeader style={{"fontSize": "1.0rem", "textAlign": "center", "padding": "0.75rem 0.25rem"}}>
                                             {hero['localized_name']}
                                         </CardHeader>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
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
                <Row>
                    <Col sm="12" md="6">
                        {drafts}
                    </Col>
                    <Col sm="12" md="6">
                        <h5 style={{"width": "100%", "textAlign": "center"}}>Chat:</h5>
                        <Chat backend={this.props.backend}
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
