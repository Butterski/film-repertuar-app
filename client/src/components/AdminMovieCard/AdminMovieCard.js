import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Popup } from "../Popup/Popup";
import "./AdminMovieCard.css";

export const AdminMovieCard = ({ movie }) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [disabledButtons, setDisabledButtons] = useState(true);
  const [isRemoved, setIsRemoved] = useState(false);
  setTimeout(() => {
    setDisabledButtons(false);
  }, 5000);

  const handleDeleteClick = () => {
    setShowDeletePopup(!showDeletePopup);
  };
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

  if (!isRemoved) {
    return (
      <div className="admin-movie-card">
        {showDeletePopup && (
          <Popup onXClick={() => setShowDeletePopup(!showDeletePopup)}>
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
        <div className="admin-movie-card-text">
          ID: {movie.id} <br />
          {movie.title}
          <br />
          Start: {movie.start_time} <br />
          Date: {new Date(movie.start_date).toDateString()}
        </div>
        <div className="admin-movie-card-buttons">
          <span
            className="admin-button remove-button"
            onClick={handleDeleteClick}
          >
            <Icon icon="mdi:rubbish-bin-outline" color="white" />
          </span>
          <span className="admin-button edit-button">
            <Icon icon="material-symbols:edit" color="white" />
          </span>
        </div>
      </div>
    );
  } else {
    return null;
  }
};
