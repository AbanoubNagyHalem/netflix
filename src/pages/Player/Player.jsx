import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState([
    {
      name: "",
      kay: "",
      published_at: "",
      typeof: "",
    },
  ]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTk0Y2IyODNiODE4MzEwMjM2ZjI1ZTk2N2FkNzBjNSIsIm5iZiI6MTc0MDUwMTE5Ni43MDg5OTk5LCJzdWIiOiI2N2JkZjBjY2EwZjQyZmNhZjMyZGJlNzAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.QD3KzOEPmu4LGhn6sMPR1jK4uvfwODdWX3jzVSeUhrA",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt=""
        onClick={() => {
          navigate(-2);
        }}
      />
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player-info">
        <p>{apiData.published_at?.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.typeof}</p>
      </div>
    </div>
  );
};

export default Player;
