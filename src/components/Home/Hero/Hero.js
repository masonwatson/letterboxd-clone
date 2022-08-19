import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { useSelector } from "react-redux";

import "./Hero.css";

const Hero = ({ selectedMovie }) => {
  const movie = useSelector((state) => state.movie);
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w1280/";

  const [playTrailer, setPlayTrailer] = useState(false);
  const [trailerAvailable, setTrailerAvailable] = useState(false);

  const handleRenderTrailer = () => {
    const trailer = movie.videos.results.find(
      (vid) => vid.type === "Trailer" && vid.official === true
    );
    if (trailer) {
      if (!trailerAvailable) setTrailerAvailable(true);
      return renderTrailer(trailer);
    } else {
      if (trailerAvailable) setTrailerAvailable(false);
      return null;
    }
  };

  const renderTrailer = (trailer) => {
    return (
      <YouTube
        className="youtube-container"
        videoId={trailer.key}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: {
            autoplay: 1,
          },
        }}
      />
    );
  };

  useEffect(() => {
    setPlayTrailer(false);
  }, [selectedMovie]);

  return (
    <div>
      {selectedMovie.id ? (
        <div
          className="hero-container"
          style={{
            backgroundImage: `url(${IMAGE_PATH}${selectedMovie.backdrop_path})`,
          }}
        >
          <div className="hero-content">
            {playTrailer && trailerAvailable ? (
              <button
                className="button close-button"
                onClick={() => setPlayTrailer(false)}
              >
                Close
              </button>
            ) : null}
            {movie.videos && playTrailer ? handleRenderTrailer() : null}
            <button
              className="button"
              onClick={() => setPlayTrailer(!playTrailer)}
            >
              Play Trailer
            </button>
            <h1 className="hero-title">{selectedMovie.title}</h1>
            {selectedMovie.overview ? (
              <p className="hero-overview">{selectedMovie.overview}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Hero;