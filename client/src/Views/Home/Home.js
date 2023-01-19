import React, { useEffect, useState } from "react";
import "./Home.css";
import { MovieCard } from "../../components/MovieCard/MovieCard";

function Home() {
  const [repertuar, setRepertuar] = useState();
  const [dates, setDates] = useState([]);

  function sortDates(dates) {
    return dates.sort((a, b) => {
      const dateA = new Date(a.split(".").reverse().join("-"));
      const dateB = new Date(b.split(".").reverse().join("-"));
      return dateA - dateB;
    });
  }

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
                            start_time={movie.start_time}
                            start_date={movie.start_date}
                          />
                        );
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
