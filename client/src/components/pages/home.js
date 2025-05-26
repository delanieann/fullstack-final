import React from "react";

const Home = () => {
  return (
    <div className="main">
      <div className="card main-card">
        <h5>Event name</h5>
        <div className="card-image">
          <img src="https://placehold.co/600x400" alt="Placeholder img"/>
        </div>
        <div className="card-content description">
          <h6>Date</h6>
          <h7>Hosted by</h7>
          <p>Text about the event here!!!!!</p>
          <br />
            <i class="material-icons">favorite</i>
        </div>
      </div>
    </div>
  );
};

export default Home;
