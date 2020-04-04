import React from 'react'
import {
    Button, InputGroupAddon, InputGroup, Input, ListGroup, ListGroupItem
} from 'reactstrap';
import {firebase} from '../firebase';


class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ""
        };
    }

    componentDidMount() {
        // Send initial message on joining
        this.submitMessage("Has joined the team!");
        this.scrollToBottom();
    }

    updateInputValue(event) {
        this.setState({
            inputValue: event.target.value
        });
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.submitMessage(this.state.inputValue);
        }
    }

    submitMessage(message) {
        const messageCopy = (' ' + message).slice(1);
        let gameDocRef = this.props.db.collection("game").doc("9op54o2N9uJEfyuHb5B3");
        const path = "teams." + this.props.team + ".chat";
        gameDocRef.update(path, firebase.firestore.FieldValue.arrayUnion({
            "timestamp": new Date().toString(),
            "player": this.props.player,
            "message": messageCopy,
        }));

        this.setState({
            inputValue: ""
        });
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({behavior: "smooth"});
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.messages !== this.props.messages) {
            this.scrollToBottom();
        }
    }

    render() {
        const messageList = this.props.messages.map(message => {
            return <ListGroupItem>
                {message["player"] + ": " + message["message"]}
            </ListGroupItem>;
        });

        // Dummy div used to scroll easily to bottom of messages listasd
        const dummyForScroll = (
            <div style={{float: "left", clear: "both"}}
                 ref={(el) => {
                     this.messagesEnd = el;
                 }}>
            </div>
        );

        return (
            <div>
                <ListGroup flush style={{"overflow-y": "auto", "height": "700px"}}>
                    {messageList}
                    {dummyForScroll}
                </ListGroup>
                <InputGroup>
                    <Input value={this.state.inputValue}
                           onChange={(event) => this.updateInputValue(event)}
                           onKeyPress={(event) => this.handleKeyPress(event)}/>
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
