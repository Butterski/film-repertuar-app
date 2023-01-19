import React, { useEffect, useState } from "react";
import "./MovieCard.css";

export const MovieCard = ({ title, start_date, start_time, runtime, genre, release_date }) => {
  const [poster, setPoster] = useState(null);
  const [movieOverwiew, setOverwiew] = useState()
  const [cardClicked, setCardClicked] = useState(false)
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  var releaseDate = new Date(release_date).toTimeString()

  function truncateString(text) {
    if (text.length > 19) {
      return text.substring(0, 18) + "...";
    }
    return text;
  }

  const onCardClick = () =>{
    setCardClicked(!cardClicked)
    setShowMoreInfo(!showMoreInfo)
  }


  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=${title}`
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const data = await response.json();
      if(data.results[0].poster_path === null){
        setPoster('/placeholder_img.png')
      } else {
        setPoster(
          `https://image.tmdb.org/t/p/w500/${data.results[0].poster_path}`
        );
      } 
      setOverwiew(data.results[0].overview)
    } 

    
    fetchData();
  }, [title]);

  return (
    <div className="MovieCard">
      <div className="movie-starttime">{start_time}</div>
      <div
        className={`movie-card-component ${cardClicked ? 'movie-card-component-clicked': ''} `}
        onClick={onCardClick}
      >
        <div
          className={`${cardClicked ? 'movie-image-clicked': 'movie-image'} `}
          style={{ backgroundImage: `url("${poster}")` }}
        ></div>
        <div className="movie-text-container">
          <div className="movie-title">
            {!cardClicked ? truncateString(title) : title}
          </div>
          <div className="movie-genre">Genre: {genre}</div>
          {showMoreInfo &&
          <>
           <div className="movie-runtime">Running time: {runtime} min</div>
           <div className="movie-release">Release date: {releaseDate}</div>
           <div className="movie-release">{movieOverwiew}</div>
           </>
           }
        </div>
      </div>
    </div>
  );
};
