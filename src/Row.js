import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import axios from "./axios";
import "./Row.css";

const baseUrl = "https://image.tmdb.org/t/p/original/";
function Row({ title, fetchURL, isLarge }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, settrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [
    fetchURL,
  ]); /* bcz it's a variable outside the bloc => dependency to refire the code cuz sthg should change for every new url */

  const options = {
    height: "390px",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  const showMovieTrailer = (movie) => {
    if (trailerUrl) settrailerUrl("");
    else {
      const movieName =
        movie?.name ||
        movie?.title ||
        movie?.original_title ||
        movie?.original_name ||
        "";
      movieTrailer(
        movieName
      ) /* this function will look for a trailer in Youtube and returns its Url */
        .then((url) => {
          const extractUrlParams = new URLSearchParams(new URL(url).search);
          settrailerUrl(extractUrlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className={`row__poster ${isLarge && "row__posterLarge"}`}
            src={`${baseUrl}${
              isLarge ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
            onClick={() => showMovieTrailer(movie)}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={options} />}
    </div>
  );
}

Row.propTypes = {
  title: PropTypes.string.isRequired,
  fetchURL: PropTypes.string.isRequired,
  isLarge: PropTypes.bool,
};

Row.defaultProps = {
  isLarge: false,
};
export default Row;
