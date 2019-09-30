import React from "react";

const Messages = props => {
  return (
    <div className="card">
      <h5 className="card-header">
        {props.messageObject.username}
        <small className="float-right text-muted">
          {props.messageObject.timestamp}
        </small>
      </h5>
      <div className="card-body">
        <p className="card-text">{props.messageObject.message}</p>
      </div>
    </div>
  );
};

export default Messages;
