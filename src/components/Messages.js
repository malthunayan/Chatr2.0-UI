import React from "react";

const Messages = props => {
  return (
    <div className="card">
      <h5 className="card-header">
        {props.messageObject.username}
        <span className="text-right">
          <small className="text-right text-muted">
            {props.messageObject.timestamp}
          </small>
        </span>
      </h5>
      <div className="card-body">
        <p className="card-text">{props.messageObject.message}</p>
      </div>
    </div>
  );
};

export default Messages;
