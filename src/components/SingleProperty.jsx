import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import BookingCalendar from "./BookingCalendar";
import ReviewForm from "./ReviewForm";
import FavouriteHeart from "./FavouriteHeart";
import "../App.css";
import {
  getPropertyReviews,
  getProperty,
  postReview,
  deleteReview,
} from "../api";

function SingleProperty({ saveProperty, currentUser }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyResponse = await getProperty(id);
        const propertyData = propertyResponse.property || propertyResponse;
        setProperty(propertyData);

        const reviewsResponse = await getPropertyReviews(id);
        const reviewsArray = Array.isArray(reviewsResponse.reviews)
          ? reviewsResponse.reviews
          : reviewsResponse || [];

        const reviewsWithId = reviewsArray.map((r) => ({
          ...r,
          guest_id: r.guest_id || 5,
        }));

        setReviews(reviewsWithId);
      } catch (err) {
        console.error("Error fetching property or reviews:", err);
      }
    };

    fetchData();
  }, [id]);
  if (!property) return <p>Loading property...</p>;

  // Calculate average rating from reviews
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : null;

  const handleToggleFavourite = async () => {
    try {
      const data = await toggleFavouriteProperty(
        property.property_id,
        currentUser.id
      );

      if (data.msg === "Property already favourited.") {
        const favProperty = {
          id: property.property_id,
          title: property.property_name,
          property_type: property.property_type,
          images: property.images,
          description: property.description,
          location: property.location,
          price_per_night: property.price_per_night,
          host: property.host,
          favourite_count: property.favourite_count,
        };
        saveProperty(favProperty);
        setIsFavourite(true);
        navigate("/profile");
        return;
      }

      const favProperty = {
        id: property.property_id,
        title: property.property_name,
        location: property.location,
        price_per_night: property.price_per_night,
        property_type: property.property_type,
        images: property.images,
      };
      saveProperty(favProperty);
      setIsFavourite(true);
      navigate("/profile");
    } catch (err) {
      console.error("Error toggling favourite:", err);
      alert("Could not add favourite");
    }
  };

  const handleDelete = async (reviewId) => {
    const updatedReviews = reviews.filter((r) => r.review_id !== reviewId);
    setReviews(updatedReviews);

    try {
      await deleteReview(reviewId);
    } catch (err) {
      console.error(err);
      alert("Could not delete review");
      setReviews(previousReviews);
    }
  };

  return (
    <div>
      <h1 className="property-title">{property.property_name}</h1>
      {property.images && (
        <div className="single-property-image-container">
          <img
            src={
              Array.isArray(property.images)
                ? property.images[0]
                : property.images
            }
            alt={property.property_name}
            className="single-property-image"
          />
          <FavouriteHeart
            isFavourite={isFavourite}
            onClick={handleToggleFavourite}
            className="favourite-heart"
          />
        </div>
      )}

      <p>Property type: {property.property_type}</p>
      <p>Description: {property.description}</p>
      <p>Location: {property.location}</p>
      <p>Price per night: £{property.price_per_night}</p>
      <p>Host: {property.host}</p>
      <p>
        <img
          src={property.host_avatar}
          alt={`${property.host}'s avatar`}
          className="host-avatar"
        />
      </p>

      <hr />
      <div className="booking-calendar-container">
        <BookingCalendar />
      </div>
      <hr />

      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="review-list">
          {reviews.map((review) => (
            <li key={review.review_id || review.tempId} className="review-item">
              <div className="review-header">
                <p className="review-guest">{review.guest}</p>
                <img
                  src={review.guest_avatar}
                  alt={`${review.guest}'s avatar`}
                  className="review-avatar"
                />

                {/* Show delete button only for your own review */}
                {currentUser &&
                  review.guest_id &&
                  String(review.guest_id) === String(currentUser.id) && (
                    <button
                      className="delete-review-btn"
                      onClick={() =>
                        handleDelete(review.review_id || review.tempId)
                      }
                    >
                      <img src="/delete.png" alt="Delete review" />
                    </button>
                  )}
              </div>

              <p className="review-date">
                {review.created_at
                  ? new Date(review.created_at).toLocaleDateString()
                  : ""}
              </p>
              <p className="review-rating">⭐ {review.rating} / 5</p>
              <p className="review-comment">{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
      {averageRating && (
        <p>
          <strong>Average rating:</strong> {averageRating} / 5
        </p>
      )}

      <hr />
      <ReviewForm
        propertyId={id}
        addReview={(newReview) => setReviews([...reviews, newReview])}
        currentUser={currentUser}
        hostName={property.host}
      />
      <hr />
    </div>
  );
}
export default SingleProperty;
