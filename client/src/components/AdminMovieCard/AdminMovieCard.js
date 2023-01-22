import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Popup } from "../Popup/Popup";
import "./AdminMovieCard.css";
import { useForm } from "react-hook-form";


export const AdminMovieCard = ({ movie }) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [disabledButtons, setDisabledButtons] = useState(true);
  const [editError, setEditError] = useState()
  const [movieDates, setMovieDates] = useState({start_date: movie.start_date, start_time: movie.start_time})
  const [isRemoved, setIsRemoved] = useState(false);
  const { register, handleSubmit } = useForm({defaultValues: {
    start_date: new Date(movie.start_date).toISOString().slice(0, 10),
    start_time: (movie.start_time).slice(0, 5),
  }});
  

  const handleDeleteClick = () => {
    setTimeout(() => {
      setDisabledButtons(false);
    }, 2000);
    setShowDeletePopup(!showDeletePopup);
  };

  const handleEditClick = () =>{
    setShowEditPopup(!showEditPopup)
  }

  const handleDeleteConfirmClick = () => {
    fetch("/api/remove_repertuar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ showtime_id: movie.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          setShowDeletePopup(!showDeletePopup);
          setIsRemoved(true);
        }
      });
  };
  const handleXClick = () =>{
    setShowDeletePopup(false); 
    setShowEditPopup(false); 
    setDisabledButtons(true);
  }

  const onEditRepertuarSubmit = (data) => {
    var [start_date, start_time] = [
      data.start_date,
      data.start_time,
    ];
    if (start_date.length > 0 && start_time.length > 0) {
      setEditError("");
      start_date = new Date(
        new Date(`${start_date} ${start_time}`) / 1 + 3600000
      ); // idk why but i need to add one hour
      fetch("/api/edit_repertuar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start_date: start_date, showtime_id: movie.id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.error(data.error);
          } else {
            setMovieDates({start_date: start_date, start_time: start_time})
            setShowEditPopup(false)
          }
        });
    } else {
      setEditError("Use all fields before submiting");
    }
  };


  if (!isRemoved) {
    return (
      <div className="admin-movie-card">
        {showDeletePopup && (
          <Popup onXClick={handleXClick}>
            <div className="admin-remove-confirmation">
              Are you sure you want to remove: <hr />
              <div className="popup-text-wrap">
                ID: {movie.id} <br />
                {movie.title}
                <br />
                Start: {movie.start_time} <br />
                Date: {new Date(movie.start_date).toDateString()}
              </div>
              <hr />
              <div className="admin-remove-confirmation-buttons">
                <button
                  disabled={disabledButtons}
                  onClick={handleDeleteConfirmClick}
                >
                  Confirm
                </button>
              </div>
            </div>
          </Popup>
        )}
        {showEditPopup && 
        <Popup onXClick={handleXClick}>
        <form
            onSubmit={handleSubmit(onEditRepertuarSubmit)}
          >
            <h2>Edit a repertuar</h2>
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
            {editError}
            <input
              className="form-submit"
              type="submit"
              value="Edit Repertuar"
            />
          </form>
        </Popup>
        }
        <div className="admin-movie-card-text">
          ID: {movie.id} <br />
          {movie.title}
          <br />
          Start: {(movieDates.start_time).slice(0, 5)} <br />
          Date: {new Date(movieDates.start_date).toDateString()}
        </div>
        <div className="admin-movie-card-buttons">
          <span
            className="admin-button remove-button"
            onClick={handleDeleteClick}
          >
            <Icon icon="mdi:rubbish-bin-outline" color="white" />
          </span>
          <span className="admin-button edit-button" onClick={handleEditClick}>
            <Icon icon="material-symbols:edit" color="white" />
          </span>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
