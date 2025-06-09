import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { useLocation } from "react-router-dom";

const Home = () => {
  const { state } = useContext(UserContext);
  const [events, setEvents] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const location = useLocation();

  const LIMIT = 5;

  const fetchEvents = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;

    setLoading(true);
    const newSkip = reset ? 0 : skip;

    try {
      const params = new URLSearchParams(location.search);
      const dateParam = params.get("date");
      const queryString = dateParam
        ? `?date=${dateParam}&skip=${newSkip}&limit=${LIMIT}`
        : `?skip=${newSkip}&limit=${LIMIT}`;

      const res = await fetch(`/all${queryString}`);
      const result = await res.json();

      const fetchedEvents = result.events || [];

      if (reset) {
        setEvents(fetchedEvents);
        setSkip(fetchedEvents.length);
        setHasMore(fetchedEvents.length === LIMIT);
      } else {
        setEvents((prev) => [...prev, ...fetchedEvents]);
        setSkip((prev) => prev + fetchedEvents.length);
        if (fetchedEvents.length < LIMIT) setHasMore(false);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(true); // reset = true
  }, [location.search]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY + 50 >=
          document.documentElement.scrollHeight &&
        hasMore &&
        !loading
      ) {
        fetchEvents(false); // load more
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading, skip]);

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
        const updated = events.map((item) => {
          return item._id === result._id ? result : item;
        });
        setEvents(updated);
      });
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
        const updated = events.map((item) => {
          return item._id === result._id ? result : item;
        });
        setEvents(updated);
      });
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    const date = new Date();
    date.setHours(+hour);
    date.setMinutes(+minute);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  return (
    <div className="home-div">
      <div className="all">
        {events.map((event, index) => {
          return (
            <div className="card all-card" key={event._id}>
              <h5>{event.title}</h5>
              <div className="card-image">
                <img
                  src={
                    event.photo || "https://placehold.co/400x200?text=No+Image"
                  }
                  alt={event.title}
                />
              </div>
              <div className="card-content description">
                <h6>
                  {new Date(event.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at {formatTime(event.time)}
                </h6>
                <h6>Hosted by: {event.author.name}</h6>
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
                      <i
                        className="material-icons"
                        onClick={() => Like(event._id)}
                      >
                        favorite_border
                      </i>
                    )}
                  </div>
                  <div>
                    <p>{event.likes ? event.likes.length : "0"} likes</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
