import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Channel = ({ user, match, channels }) => {
  if (!user) return <Redirect to="/login" />;
  const { channelID } = match.params;
  const channel = channels.find(channel => channel.id === +channelID);
  if (!!channel) {
    return (
      <div>
        <h1>{channel.name}</h1>
        <p>now that you're logged in you can see this page</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  user: state.user,
  channels: state.channel.allChannels
});

export default connect(mapStateToProps)(Channel);
