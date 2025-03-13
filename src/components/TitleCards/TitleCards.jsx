/* eslint-disable react/prop-types */
import "./TitleCards.css";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${
            category || "now_playing"
          }?language=en-US&page=1`,
          options
        );
        const data = await res.json();
        setApiData(data.results || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMovies();

    const currentRef = cardsRef.current;
    if (currentRef) {
      currentRef.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("wheel", handleWheel);
      }
    };
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title || "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.length > 0 ? (
          apiData.map((card) => (
            <Link to={`/player/${card.id}`} className="card" key={card.id}>
              {card.backdrop_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                  alt={card.original_title || "Movie Thumbnail"}
                />
              ) : (
                <div className="placeholder">No Image Available</div>
              )}
              <p className="movie-title">
                {card.original_title.length > 30
                  ? card.original_title.slice(0, 30) + "..."
                  : card.original_title}
              </p>
            </Link>
          ))
        ) : (
          <p className="no-data">No Movies Available</p>
        )}
      </div>
    </div>
  );
};

export default TitleCards;
