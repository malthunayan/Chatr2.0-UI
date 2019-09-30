import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function Welcome(props) {
  return (
    <header className="masthead d-flex">
      <div className="container text-center my-auto z-1">
        <h1 className="mb-1">WELCOME TO CHATR</h1>
        {!props.user && (
          <>
            <h3 className="mb-5">
              <em>You're gonna need to login to see the messages</em>
            </h3>
            <Link to="/login" className="btn btn-primary btn-lg">
              Login
            </Link>
          </>
        )}
      </div>
      <div className="overlay z-0" />
    </header>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Welcome);
