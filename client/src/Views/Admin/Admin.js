import React, { useEffect, useState } from "react";
import "./Admin.css";
import { useForm } from "react-hook-form";
import CryptoJS from "crypto-js";
import sortDates from "../../scripts/sortDates";
import { AdminMovieCard } from "../../components/AdminMovieCard/AdminMovieCard";

const Admin = () => {
  const [authorised, setAuthorised] = useState(false);
  const [movies, setMovies] = useState();
  const [error, setError] = useState("");
  const [addError, setAddError] = useState("");
  const [afterSubmitMessage, setAfterSubmitMessage] = useState("");
  const [repertuar, setRepertuar] = useState();
  const [dates, setDates] = useState([]);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const hashedPassword = CryptoJS.SHA1(data.password).toString();
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login: data.login, password: hashedPassword }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error.toString());
        } else {
          localStorage.setItem("token", data.token);
          setAuthorised(true);
        }
      });
  };
  const onAddRepertuarSubmit = (data) => {
    var [movie_id, start_date, start_time] = [
      data.movie_id,
      data.start_date,
      data.start_time,
    ];
    if (movie_id.length > 0 && start_date.length > 0 && start_time.length > 0) {
      setAddError("");
      start_date = new Date(
        new Date(`${start_date} ${start_time}`) / 1 + 3600000
      ); // idk why but i need to add one hour
      fetch("/api/add_repertuar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movie_id: movie_id, start_date: start_date }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.error(error);
          } else {
            setAfterSubmitMessage(
              `Sucesfully added movie with id ${data.movie_id} at ${data.start_date}`
            );
          }
        });
    } else {
      setAddError("Use all fields before submiting");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && token.length > 0) {
      setAuthorised(true);
    }
    if (authorised) {
      fetch("/api/get_movies", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMovies(data);
        });
    }
  }, [authorised]);

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
    <div className="Admin">
      <div className="admin-panel-header">
        Wellcome in admin panel you can submit new movies here
      </div>
      {!authorised ? (
        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="form-heading">Login</h1>
            {error}
            <input
              className="form-input"
              {...register("login", { required: true })}
              placeholder="login"
            />
            <br />
            <input
              className="form-input"
              type="password"
              {...register("password", { required: true })}
              placeholder="password"
            />
            <br />
            <input className="form-submit" type="submit" value={"Submit"} />
          </form>
        </div>
      ) : (
        <div className="">
          <form
            className="repertuar-form"
            onSubmit={handleSubmit(onAddRepertuarSubmit)}
          >
            <h2>Add a new repertuar</h2>
            <div className="form-field movie-select">
              <label>Movie:</label>
              <select {...register("movie_id", { required: true })}>
                {movies &&
                  movies.map((movie) => (
                    <option value={movie.id} key={movie.id}>
                      {movie.title}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-field date">
              <label>Date:</label>
              <input
                type="date"
                {...register("start_date", { required: true })}
              />
            </div>
            <div className="form-field">
              <label>Start Time:</label>
              <input type="time" {...register("start_time")} />
            </div>
            {addError}
            <input
              className="form-submit"
              type="submit"
              value="Add Repertuar"
            />
            {afterSubmitMessage}
          </form>
          <div className="admin-panel-movies">
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
                              <AdminMovieCard
                                movie={movie}
                                key={movie.start_time + movie.title}
                              />
                            );
                          }
                        })}
                      </div>
                    </div>
                  );
                })
              : "loading..."}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
