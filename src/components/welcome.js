import React from 'react'
import {
    Button,
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardTitle,
    Col,
    Container,
    ListGroup,
    ListGroupItem,
    Row,
    Spinner
} from "reactstrap";
import {Link} from "react-router-dom";


class Welcome extends React.Component {
    render() {
        const teams = this.props.teams;
        if (teams == null) {
            return (
                <div>
                    <h1>Loading teams...</h1>
                    <Spinner color="primary"/>
                </div>
            )
        }

        const radiantPlayers = teams["radiant"]["players"].map(player => {
            return <ListGroupItem key={player}>{player}</ListGroupItem>
        });

        const direPlayers = teams["dire"]["players"].map(player => {
            return <ListGroupItem key={player}>{player}</ListGroupItem>
        });

        return (
            <Container>
                <Row>
                    <Col>
                        <Card>
                            <CardImg
                                src="https://gamepedia.cursecdn.com/dota2_gamepedia/9/9b/Radiant_logo.png?version=32e00d1012d73614f60704d6a77207cb"
                                alt="Radiant logo"/>
                            <CardBody>
                                <CardTitle><h2>Radiant</h2></CardTitle>
                                <CardSubtitle>Players:</CardSubtitle>
                                <ListGroup flush>
                                    {radiantPlayers}
                                </ListGroup>
                                <Button color="primary" tag={Link} to="/radiant"
                                        disabled={teams["radiant"]["players"].length >= 5}>Join</Button>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <CardImg
                                src="https://gamepedia.cursecdn.com/dota2_gamepedia/4/46/Dire_logo.png?version=26566f7414e47fa1203d2f0a0ae3d64b"
                                alt="Dire logo"/>
                            <CardBody>
                                <CardTitle><h2>Dire</h2></CardTitle>
                                <CardSubtitle>Players:</CardSubtitle>
                                <ListGroup flush>
                                    {direPlayers}
                                </ListGroup>
                                <Button color="primary" tag={Link} to="/dire"
                                        disabled={teams["dire"]["players"].length >= 5}>Join</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Welcome
