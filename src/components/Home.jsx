import React from "react";
import '../styles/style.css'

const Home = () => {
  return (
    <div className="container-home">
      <div className="container-home-left">
        <div className="image">
          <img src="../images/profile-photo.jpg" alt="profile photo"></img>
        </div>
      </div>
      <div className="container-home-right">
        <h1 className="name">
          Bogdan <span>Muntean</span>
        </h1>
        <p>
          I'm a Junior Web Developer passionate about technology, programming,
          science, marketing and economics. I like to create websites that are
          enjoyable, interesting, creative and useful.
        </p>
        <div className="btn-download">
          <a href="./docs/CV-Bogdan.Muntean.pdf" className="main-btn" download>
            <span className="btn-text">Download CV</span>
            <span className="btn-icon">
              <i className="fas fa-download"></i>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
