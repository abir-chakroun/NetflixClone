/* eslint-disable no-console */
import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);
  const baseUrl = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const randomMovie =
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ];
      console.log(randomMovie);
      setMovie(randomMovie);
    }

    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? `${str.substr(0, n - 1)}...` : str;
  }
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${baseUrl}${movie?.backdrop_path})`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {" "}
          {movie?.name ||
            movie?.title ||
            movie?.original_title ||
            movie?.original_name}
        </h1>

        <div className="banner__buttons">
          <button className="banner__button" type="button">
            {" "}
            Play
          </button>
          <button className="banner__button" type="button">
            {" "}
            My List
          </button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner--fadeButtom" />
    </header>
  );
}

export default Banner;
