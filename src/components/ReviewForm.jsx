import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReviewSection = ({ propertyId }) => {
  const [guestId, setGuestId] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const ratingNumber = Number(rating);
    if (ratingNumber < 1 || ratingNumber > 5) {
      alert("Please enter a rating between 1 and 5.");
      return;
    }
  
    if (!comment.trim()) {
      alert("Please enter a comment.");
      return;
    }
  
    const newReview = {
      id: Date.now(),
      property_id: propertyId,
      guest_id: guestId,
      rating: ratingNumber,
      comment,
    };
  
    try {
      const response = await fetch(`http://localhost:9090/api/properties/${propertyId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit review");
      }
  
      //  Clear form after submission
      setGuestId("");
      setRating("");
      setComment("");
  
      alert("Review submitted successfully!");
      navigate("/profile"); // redirect after alert
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Error submitting review. Please try again.");
    }
  };

     
  return (
    <div>
      <h2>Add a Review:</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Guest ID:</label>
          <input
            type="text"
            value={guestId}
            onChange={(e) => setGuestId(e.target.value)}
            placeholder="Enter your Guest ID"
          />
        </div>

        <div>
          <label>Rating (1-5):</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            required
          />
        </div>

        <div>
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            placeholder="Write your review here..."
          />
        </div>

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewSection;
