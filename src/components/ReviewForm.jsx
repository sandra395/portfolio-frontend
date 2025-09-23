import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { postReview } from "../api";

const ReviewForm = ({ propertyId, addReview, currentUser, hostName }) => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentUser.name === hostName) {
      alert("You cannot review your own property.");
      return;
    }

    const newReview = {
      tempId: Date.now(),
      guest_id: currentUser.id,
      guest: currentUser.name,
      guest_avatar: currentUser.avatar,
      rating: Number(rating),
      comment,
    };

    addReview(newReview);

    try {
      const data = await postReview(propertyId, newReview);
      if (!data || !data.review_id) {
        alert("Failed to submit review.");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting review.");
    }

    setRating("");
    setComment("");
  };

  return (
    <div className="review-section">
      <h2>Add a Review:</h2>
      <form onSubmit={handleSubmit}>
        <label>Rating (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
        />

        <label>Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
