import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Messages from "./Messages";

import { fetchChannel, sendMessage } from "../redux/actions";

class Channel extends React.Component {
  state = {
    message: ""
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.sendMessage(
      this.props.match.params.channelID,
      this.state,
      this.props.user
    );
    let text = document.messageForm.message;
    text.value = "";
  };

  componentDidMount() {
    const channelID = this.props.match.params.channelID;
    this.props.fetchChannel(channelID);
  }

  componentDidUpdate(prevProps) {
    const channelID = this.props.match.params.channelID;
    if (channelID !== prevProps.match.params.channelID) {
      this.props.fetchChannel(channelID);
    }
  }

  render() {
    if (!this.props.user) return <Redirect to="/login" />;
    if (this.props.loading) {
      return (
        <div>
          <h1>Loading</h1>
        </div>
      );
    } else {
      const channel = this.props.channel;
      const messages = channel.map(messageObject => (
        <Messages
          key={`${messageObject.message} ${messageObject.id} ${messageObject.timestamp}`}
          messageObject={messageObject}
        />
      ));
      // let scroller = document.getElementById("scroller");
      // if (scroller) {
      //   scroller.scrollIntoView(false);
      // }
      let channelName = "";
      if (this.props.allChannels.length > 0) {
        channelName = this.props.allChannels.find(
          channel => channel.id === +this.props.match.params.channelID
        ).name;
      }
      // console.log(scroller);
      return (
        <div>
          {messages}
          <form name="messageForm" onSubmit={this.submitHandler}>
            <div className="row" id="scroller">
              <div className="col-10" style={{ paddingRight: 0 }}>
                <textarea
                  style={{ height: "100%", width: "100%", resize: "none" }}
                  name="message"
                  placeholder={`Message ${channelName}`}
                  onChange={this.changeHandler}
                ></textarea>
              </div>
              <div className="col-2" style={{ padding: 0 }}>
                <input
                  className="btn btn-success align-middle"
                  style={{ padding: "34px", width: "100%", borderRadius: 0 }}
                  type="submit"
                  value="Send"
                />
              </div>
            </div>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.user,
  channel: state.channel.currentChannel,
  allChannels: state.channel.allChannels,
  loading: state.channel.loading
});

const mapDispatchToProps = dispatch => {
  return {
    fetchChannel: channelID => dispatch(fetchChannel(channelID)),
    sendMessage: (channelID, message, user) =>
      dispatch(sendMessage(channelID, message, user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);
