import React from 'react'
import { Spinner, Button, Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle,
    CardSubtitle } from 'reactstrap';
import styled from 'styled-components';

const AlignedText = styled.div`
  text-align: center;
  vertical-align: middle;
`;


class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            heroes: [],
            draft: []
        };

        // Fetch heroes from API, then perform first draft
        fetch("https://api.opendota.com/api/heroStats")
            .then(res => res.json())
            .then(result => {
                this.setState({
                        heroes: result
                });
                this.performDraft();
            });
    }

    performDraft() {
        // Split heroes based on main attribute
        let mappedHeroes = {int: [], str: [], agi: []};
        this.state.heroes.forEach(hero => {
            const heroAttribute = hero['primary_attr'];
            mappedHeroes[heroAttribute].push(hero)
        });

        this.setState({
            // Sample one hero from each attribute type
            draft: Object.values(mappedHeroes).map(heroes => this.randomSample(heroes))
        });
    }

    convertToApiPath(path) {
        return "https://api.opendota.com" + path
    }

    randomSample(items){
        return items[Math.floor(Math.random() * items.length)];
    }

    render() {
        // Show loading screen
        const hasLoaded = this.state.heroes.length > 0;
        if (!hasLoaded) {
            return (
                <AlignedText>
                    <h1>Loading heroes...</h1>
                    <Spinner style={{ width: '2rem', height: '2rem' }} />
                </AlignedText>
            )
        }

        // Heroes have been loaded - render
        const renderedHeroes = this.state.draft
            .map(hero =>
                <Col md="4" xs="12" key={hero['id']}>
                    <Card>
                        <CardImg top width="100%" src={this.convertToApiPath(hero['img'])} alt="hero image" />
                        <CardBody>
                            <CardTitle><h3>{hero['localized_name']}</h3></CardTitle>
                            <CardSubtitle className="text-primary">
                                {hero['attack_type'] + " " + hero['primary_attr']}
                            </CardSubtitle>
                            <CardText className="text-info">{hero['roles'].join(", ")}</CardText>
                        </CardBody>
                    </Card>
                </Col>
            );

        return (
            <AlignedText>
                <h1>You have been given:</h1>
                <Container style={{marginTop: "20px", marginBottom: "50px"}}>
                    <Row>
                        {renderedHeroes}
                    </Row>
                </Container>
                <Button color="primary" onClick={(e) => {
                    e.preventDefault();
                    this.performDraft();
                }}>Roll the dice again...</Button>
            </AlignedText>
        );
    }
}

export default MainScreen
