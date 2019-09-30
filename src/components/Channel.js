import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Messages from "./Messages";

import { fetchChannel } from "../redux/actions";

class Channel extends React.Component {
  componentDidMount() {
    const channelID = this.props.match.params.channelID;
    this.props.fetchChannel(channelID);
  }

  componentDidUpdate(prevProps) {
    if (this.props.channel !== prevProps.channel) {
      const channelID = this.props.match.params.channelID;
      this.props.fetchChannel(channelID);
    }
  }

  render() {
    const channel = this.props.channel;
    if (!!channel) {
      const messages = channel.map(messageObject => (
        <Messages key={messageObject.id} messageObject={messageObject} />
      ));
      return <div>{messages}</div>;
    } else {
      if (!this.props.user) return <Redirect to="/login" />;
      return (
        <div>
          <h1>Loading</h1>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.user,
  channel: state.channel.currentChannel
});

const mapDispatchToProps = dispatch => {
  return {
    fetchChannel: channelID => dispatch(fetchChannel(channelID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);
