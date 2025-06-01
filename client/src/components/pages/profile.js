import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";

const Profile = () => {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    fetch("/history", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (Array.isArray(result.history)) {
          setData(result.history);
        } else {
          setData([]);
        }
      });
  }, []);

  const deleteEvent = (eventId)=>{
    fetch(`/delete/${eventId}`, {
        method: "delete",
        headers: {
            Authorization: "Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        const newData = data.filter(event=>{
            return event._id !== result._id
        })
        setData(newData)
    })
  }
  return (
    <div className="history">
      <div className="profile-header">
        <div>
          <h4>{state ? state.name + "'s Events." : ""}</h4>
        </div>
      </div>
      {data.map((history) => {
        return (
          <div className="card all-card" key={history._id}>

            <div className="title-div">
            <div>
                <h5>{history.title}</h5>
            </div>
            
            <div>
            <i className="material-icons"
            onClick={()=>deleteEvent(history._id)}
            >delete_forever</i>
            </div>

            </div>

            <div className="card-image">
              <img
                src={
                  history.photo || "https://placehold.co/400x200?text=No+Image"
                }
              />
            </div>
            <div className="card-content description">
              <h6>{history.date}</h6>
              <p>{history.description}</p>
              <br />

              <div className="likes-div">
                <div>
                  <i className="material-icons">favorite</i>
                </div>
                <div>
                  <p>{history.likes ? history.likes.length : "0"} likes</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Profile;
