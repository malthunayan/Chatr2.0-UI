import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";
import { fetchAllChannels, createNewChannel } from "../../redux/actions";

class SideNav extends React.Component {
  state = {
    collapsed: false,
    channelName: ""
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.createChannel(this.state.channelName, this.props.history);
  };

  render() {
    const channelLinks = this.props.channels.map(channel => (
      <ChannelNavLink key={channel.name} channel={channel} />
    ));
    return (
      <div>
        <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
          <li className="nav-item" data-toggle="tooltip" data-placement="right">
            <div className="nav-link heading">
              <span className="nav-link-text mr-2">Channels</span>
              <FontAwesomeIcon
                icon={faPlusCircle}
                data-toggle="collapse"
                data-target="#createChannelForm"
                aria-expanded="false"
              />
              <div id="createChannelForm" className="collapse">
                <form onSubmit={this.submitHandler}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Channel name"
                    name="channelName"
                    onChange={this.changeHandler}
                  />
                  <input
                    className="btn btn-success btn-block"
                    type="submit"
                    value="Create Channel"
                  />
                </form>
              </div>
            </div>
          </li>
          {channelLinks}
        </ul>
        <ul className="navbar-nav sidenav-toggler">
          <li className="nav-item">
            <span
              className="nav-link text-center"
              id="sidenavToggler"
              onClick={() =>
                this.setState(prevState => ({
                  collapsed: !prevState.collapsed
                }))
              }
            >
              <FontAwesomeIcon
                icon={this.state.collapsed ? faAngleRight : faAngleLeft}
              />
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    channels: state.channel.allChannels
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchChannels: () => dispatch(fetchAllChannels()),
    createChannel: (channelName, history) =>
      dispatch(createNewChannel(channelName, history))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SideNav)
);
