import React, { useEffect, useState } from "react";
import "./Home.css";
import { MovieCard } from "../../components/MovieCard/MovieCard";
import sortDates from "../../scripts/sortDates";

function Home() {
  const [repertuar, setRepertuar] = useState();
  const [dates, setDates] = useState([]);

  useEffect(() => {
    fetch("/api/get_repertuar")
      .then((res) => res.json())
      .then((data) => {
        setRepertuar(data);
        let start_time_dates = [];
        data.forEach((element) => {
          let stDate = new Date(element.start_date).toLocaleDateString();
          start_time_dates.push(stDate);
        });
        setDates(sortDates([...new Set(start_time_dates)]));
      });
  }, []);

  return (
    <div className="App">
      <header className="App-container">
        {repertuar
          ? dates.map((date) => {
              return (
                <div key={date}>
                  <hr />
                  {date}
                  <br />
                  <div className="movies-container">
                    {repertuar.map((movie) => {
                      let filmDate = new Date(
                        movie.start_date
                      ).toLocaleDateString();
                      if (filmDate === date) {
                        return (
                          <MovieCard
                            key={movie.start_time + movie.title}
                            title={movie.title}
                            release_date={movie.release_date}
                            genre={movie.genre}
                            runtime={movie.runtime}
                            start_time={(movie.start_time).slice(0, 5)}
                            start_date={movie.start_date}
                          />
                        );
                      } else {
                        return null;
                      }
                    })}
                  </div>
                </div>
              );
            })
          : "loading..."}
      </header>
    </div>
  );
}

export default Home;
