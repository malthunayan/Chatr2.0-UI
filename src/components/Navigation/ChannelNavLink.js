import React from "react";
import { NavLink } from "react-router-dom";
// import { connect } from "react-redux";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

const ChannelNavLink = ({ channel }) => {
  return (
    <li
      className="nav-item"
      data-toggle="tooltip"
      data-placement="right"
      title={channel.name}
    >
      <NavLink className="nav-link" to={`/channels/${channel.id}`}>
        <FontAwesomeIcon icon={faHashtag} />
        <span className="nav-link-text">
          {channel.name}
          {/* <span className="badge badge-light ml-2">hi</span> */}
        </span>
      </NavLink>
    </li>
  );
};

// const mapStateToProps = state => {
//   return {
//     channels:
//   }
// }

export default ChannelNavLink;
