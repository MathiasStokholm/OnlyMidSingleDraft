import React from 'react'
import {
    Button, InputGroupAddon, InputGroup, Input, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText
} from 'reactstrap';
import styled from 'styled-components';
import {firebase, FirebaseContext} from '../firebase';

const AlignedText = styled.div`
  text-align: center;
  vertical-align: middle;
`;


class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ""
        };

        // Send initial message on joining
        this.submitMessage("Has joined the team!")
    }

    updateInputValue(event) {
        this.setState({
            inputValue: event.target.value
        });
    }

    submitMessage(message) {
        let gameDocRef = this.props.db.collection("game").doc("9op54o2N9uJEfyuHb5B3");
        const path = "teams." + this.props.team + ".chat";
        gameDocRef.update(path, firebase.firestore.FieldValue.arrayUnion({
            "player": this.props.player,
            "message": message
        }));

        this.setState({
            inputValue: ""
        });
    }

    render() {
        const messageList = this.props.messages.map(message => {
            return <ListGroupItem>
                <ListGroupItemHeading>{message["player"]}</ListGroupItemHeading>
                <ListGroupItemText>
                    {message["message"]}
                </ListGroupItemText>
            </ListGroupItem>;
        });

        return (
            <div>
                <ListGroup flush style={{"overflow-y": "scroll", "max-height": "200px"}}>
                    {messageList}
                </ListGroup>
                <InputGroup>
                    <Input onChange={(event) => this.updateInputValue(event)}/>
                    <InputGroupAddon addonType="append">
                        <Button color="info"
                                disabled={this.state.inputValue.length <= 0}
                                onClick={() => this.submitMessage(this.state.inputValue)}>Send</Button>
                    </InputGroupAddon>
                </InputGroup>
            </div>
        );
    }
}

export default Chat
