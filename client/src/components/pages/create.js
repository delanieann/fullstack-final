import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'

const Create = () => {
  const nav = useNavigate()
  const [title, setTitle] = useState("");
  const [descrip, setDescrip] = useState("");
  const [date, setDate] = useState("");
  const [img, setImg] = useState("");

  const PostImg = () => {
    if (img) {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "pdx-fun");
      data.append("cloud_name", "dnmvsnnab");

    fetch("https://api.cloudinary.com/v1_1/dnmvsnnab/image/upload", {
      method: "POST",
      body: data,
    })
    .then((res) => res.json())
    .then((data) => {
      postEvent(data.url);
    }).catch(err=> {
      console.error("Image upload: ", err)
    });
    } else {
      postEvent("")
    }
  };

  const postEvent = (img_url) =>{
      fetch("/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          description: descrip,
          date,
          photo: img_url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          nav("/");
        })
        .catch((err) => {
          console.error("Create post error:", err);
        });
  };
  return (
    <div className="card input-filed create-card">
      <label for="title" className="create-label">
        Event Name
      </label>
      <input
        type="text"
        placeholder="Event name"
        name="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <br />

      <label for="date" className="create-label">
        Date
      </label>
      <input
        type="datetime-local"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />
      <br />

      <label for="photo" className="create-label">
        Photos
      </label>
      <form action="#">
        <div className="file-field input-field">
          <div className="btn waves-effect waves-light green lighten-1">
            <span>File</span>
            <input
              type="file"
              multiple={false}
              onChange={(event) => setImg(event.target.files[0])}
            />{" "}
          </div>
          <div className="file-path-wrapper">
            <input
              className="file-path validate"
              type="text"
              value={img.name || ""}
            />
          </div>
        </div>
      </form>

      <label for="description" className="create-label">
        Details
      </label>

      <textarea
        id="description"
        name="description"
        placeholder="Description of your event."
        className="desc-textarea"
        value={descrip}
        onChange={(event) => setDescrip(event.target.value)}
      />

      <br />
      <button
        className="btn waves-effect waves-light green lighten-1 submit-btn"
        onClick={PostImg}
      >
        Post Event
      </button>
    </div>
  );
};

export default Create;
