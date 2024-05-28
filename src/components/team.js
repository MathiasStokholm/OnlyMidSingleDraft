import React from 'react'
import {
    Button, Card, CardImg, Col, Container,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader, Row, Spinner, CardHeader, Progress,
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

    onHeroClicked(playerIndex, heroId) {
        this.props.backend.setSelectedHero(this.props.teamName, playerIndex, heroId)
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
            if (players.length >= 7) {
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

        const createPlayerRow = (playerIndex, player, hero_ids, selected_id) => {
            return (
                <Row style={{"marginBottom": "10px"}} key={player}>
                    <div style={{"width": "100%", "textAlign": "center"}}>
                        <Col>
                            <h5 style={{"marginBottom": "2px"}}>{player}</h5>
                        </Col>
                    </div>
                    <Row style={{"marginLeft": "0px", "marginRight": "0px"}}>
                        {hero_ids.map(hero_id => {
                            const hero = findHero(hero_id);
                            const selected = hero_id === selected_id;
                            const tooltipId = "Card_" + player + hero_id;
                            return (
                                <Col xs="3" style={{"padding": "2px"}} key={tooltipId}>
                                    <Card href="#" id={tooltipId}
                                          style={{cursor: "pointer"}}
                                          onClick={() => this.onHeroClicked(playerIndex, hero_id)}
                                          {...(selected ? {color: "info", inverse: true} : {})}>
                                        <CardImg top src={this.props.backend.convertToApiPath(hero['img'])}
                                                 alt="hero image"/>
                                        <CardHeader style={{
                                            "fontSize": "1.0rem",
                                            "textAlign": "center",
                                            "padding": "0.75rem 0.25rem"
                                        }}>
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
            const selected_id = team["selectedHeroes"][index.toString()];
            drafts.push(createPlayerRow(index, player, hero_ids, selected_id));
        }

        const this_team_ready = team["ready"];
        const radiant_ready = this.props.readiness["radiant"];
        const dire_ready = this.props.readiness["dire"];

        const readyIndicator = <div style={{"width": "100%", "textAlign": "center", "marginBottom": "30px"}}>
            <Button style={{"marginBottom": "10px"}}
                {...(this_team_ready ? {color: "success"} : {color: "secondary"})}
                    onClick={() => this.props.backend.setReady(teamName, !this_team_ready)}>Ready</Button>
            <Progress multi>
                <Progress bar value="50"
                          {...(radiant_ready ? {color: "success"} : {color: "danger"})}>Radiant</Progress>
                <Progress bar value="50"
                          {...(dire_ready ? {color: "success"} : {color: "danger"})}>Dire</Progress>
            </Progress>
        </div>

        return (
            <Container>
                <Row>
                    <Col sm="12" md="6">
                        {drafts}
                    </Col>
                    <Col sm="12" md="6">
                        {readyIndicator}

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
