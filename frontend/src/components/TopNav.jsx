import React, { Component } from "react";

export default class TopNav extends Component {
  render() {
    return (
      <div className="top-nav">
        <button className="button">
          Git
          <big>
            <b>Check</b>
          </big>
        </button>
        <span>Check the health of your repository branch - for free!</span>
        <button className="button-purple">
          <big>
            <b>GitHub </b>
            <i class="fa-brands fa-github-alt"></i>
          </big>
        </button>
      </div>
    );
  }
}
