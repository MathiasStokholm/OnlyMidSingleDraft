import React from 'react'
import {
    Button, InputGroupAddon, InputGroup, Input, ListGroup, ListGroupItem
} from 'reactstrap';


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
        this.props.backend.sendChatMessage(this.props.team, this.props.player, message);
        this.setState({
            inputValue: ""
        });
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({behavior: "smooth"});
    };

    componentDidUpdate(prevProps) {
        // Scroll to bottom if update has changed the number of messages
        if (prevProps.messages.length !== this.props.messages.length) {
            this.scrollToBottom();
        }
    }

    render() {
        const messageList = this.props.messages.map(message => {
            return <ListGroupItem key={message["timestamp"]}>
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
                <ListGroup flush style={{"overflowY": "auto", "maxHeight": "700px"}}>
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
