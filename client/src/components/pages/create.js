import React, { useState } from "react";

const Create = () => {
  const [title, useTitle] = useState("")
  const [descrip, useDescrip] = useState("")
  const [date, useDate] = useState("")
  const [img, setImg] = useState("")

  const Post = ()=>{
    
  }

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
        onChange={(event) => useTitle(event.target.value)}
      />
      <br />

      <label for="date" className="create-label">
        Date
      </label>
      <input
        type="date"
        value={date}
        onChange={(event) => useDate(event.target.value)}
      />
      <br />


      <label for="photo" className="create-label">
        Photos
      </label>
      <form action="#">
        <div className="file-field input-field">
          <div className="btn waves-effect waves-light green lighten-1">
            <span>File</span>
            <input type="file" onChange={(event)=>console.log(event.target.files)} />
            {" "}
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
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
        onChange={(event) => useDescrip(event.target.value)}
      />

      <br />
      <button className="btn waves-effect waves-light green lighten-1 submit-btn"
      onClick={Post}>
        Post Event
      </button>
    </div>
  );
};

export default Create;
