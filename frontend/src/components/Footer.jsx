import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <>
        <hr />
        <div className="footer-container">
          <div className="copyright-container">
            <i
              class="fa-regular fa-copyright"
              style={{ marginRight: "1rem" }}
            ></i>{" "}
            Shreyas Nikam
          </div>
          <div className="links-container">
            <a href="https://www.linkedin.com/in/nikam-shreyas/">
              <big>
                <i class="fa-brands fa-linkedin"></i>
              </big>
            </a>

            <a href="https://github.com/nikam-shreyas">
              <big>
                <i class="fa-brands fa-github"></i>
              </big>
            </a>
            <a href="https://www.instagram.com/n.5hreyas/">
              <big>
                <i class="fa-brands fa-instagram"></i>
              </big>
            </a>
          </div>
        </div>
      </>
    );
  }
}
