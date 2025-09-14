import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BookingCalendar from "./BookingCalendar";
import ReviewSection from "./ReviewForm";
import FavouriteHeart from "./FavouriteHeart";

function SingleProperty({ saveProperty }) {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const guestId = 5;

  const [property, setProperty] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [dates, setDates] = useState([null, null]);
  const [isFavourite, setIsFavourite] = useState(false);

  // Fetch property and reviews
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:9090/api/properties/${id}`);
        const data = await res.json();
        setProperty(data.property);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch(
          `http://localhost:9090/api/properties/${id}/reviews`
        );
        const data = await res.json();
        setReviews(data.reviews || []);
      } catch (err) {
        console.error("Reviews fetch error:", err);
      }
    };

    fetchProperty();
    fetchReviews();
  }, [id]);

  if (!property) return <p>Loading property...</p>;

  // Calculate average rating from reviews
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;


  const handleToggleFavourite = async () => {
    try {
      const res = await fetch(
        `http://localhost:9090/api/properties/${property.property_id}/favourite`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ guest_id: guestId })
        }
      );
  
      const data = await res.json();
  
      if (!res.ok) {
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
        throw new Error(`Failed to favourite: ${JSON.stringify(data)}`);
      }
  
  
      const favProperty = {
        id: property.property_id,
        title: property.property_name,
        location: property.location,
        price_per_night: property.price_per_night,
        property_type: property.property_type,
        images: property.images
      };
      saveProperty(favProperty);
      setIsFavourite(true);
      navigate("/profile");
    } catch (err) {
      console.error("Error toggling favourite:", err);
      alert("Could not add favourite");
    }
  };
  return (
    <div>
      <Header />

      {property.images && (
        <div>
          <img
            src={property.images}
            alt={property.property_name}
            width="600"
          />
          <FavouriteHeart
            isFavourite={isFavourite}
            onClick={handleToggleFavourite}
          />
        </div>
      )}

      <h1>{property.property_name}</h1>
      <p>Property type: {property.property_type}</p>
      <p>Description: {property.description}</p>
      <p>Location: {property.location}</p>
      <p>Price per night: £{property.price_per_night}</p>
      <p>Host: {property.host}</p>
      <p>
        <img
          src={property.host_avatar}
          alt={`${property.host}'s avatar`}
          width="100"
          height="100"
        />
      </p>

      <hr />
      <BookingCalendar dates={dates} setDates={setDates} onBook={() => {}} />
      <hr />

      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <>
        <ul>
          {reviews.map((review) => (
            <li key={review.review_id}>
              <div>
              <p>{review.guest}</p>
                <img
                  src={review.guest_avatar}
                  alt={`${review.guest}'s avatar`}
                  width="50"
                  height="50"
                />
              </div>
              <p>Created at: {new Date(review.created_at).toLocaleString()}</p>
              <p>Rating: {review.rating} / 5</p>
              <p>Comment: {review.comment}</p>
            </li>
          ))}
        </ul>
    {/*  Average rating shown after all comments */}
    <p><strong>Average rating:</strong> {averageRating} / 5</p>
        </>
      )}

      <hr />
      <ReviewSection
        propertyId={id}
        addReview={(newReview) => setReviews([...reviews, newReview])}
      />

      <hr />
      <Footer />
    </div>
  );
}

export default SingleProperty;
