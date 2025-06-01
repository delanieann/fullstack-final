import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";

const Home = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch("/all")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.events);
      });
  }, []);

  const Like = (id) => {
    fetch("/like", {
      method: "put",
      headers: {
        "Content-Type": "application/JSON",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          return item._id === result._id ? result : item;
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const Dislike = (id) => {
    fetch("/dislike", {
      method: "put",
      headers: {
        "Content-Type": "application/JSON",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          return item._id === result._id ? result : item;
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="all">
      {data.map((event) => {
        return (
          <div className="card all-card" key={event._id}>
            <h5>{event.title}</h5>
            <div className="card-image">
              <img
                src={
                  event.photo || "https://placehold.co/400x200?text=No+Image"
                }
              />
            </div>
            <div className="card-content description">
              <h6>{event.date}</h6>
              <h7>Hosted by: {event.author.name}</h7>
              <p>{event.description}</p>
              <br />
              <div className="likes-div">
                <div>
                {state && state._id && event.likes?.includes(state._id) ? (
                  <i
                    className="material-icons"
                    onClick={() => Dislike(event._id)}
                  >
                    favorite
                  </i>
                ) : (
                  <i className="material-icons" onClick={() => Like(event._id)}>
                    favorite_border
                  </i>
                )}
                </div><div>
                <p>{event.likes ? event.likes.length : "0"} likes</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
