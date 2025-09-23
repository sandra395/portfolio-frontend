import axios from "axios";

const API_BASE = "http://localhost:9090/api";

// ---------------- PROPERTIES ----------------
export const getProperties = async () => {
  const res = await axios.get(`${API_BASE}/properties`);
  return res.data;
};

export const getProperty = async (propertyId) => {
  const res = await axios.get(`${API_BASE}/properties/${propertyId}`);
  return res.data;
};

// Fetch all properties for a specific host
export const getUserProperties = async (ownerId) => {
  try {
    const res = await axios.get(`${API_BASE}/properties?host=${ownerId}`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch user properties:", err);
    return { properties: [] };
  }
};

// ---------------- BOOKINGS ----------------
export const getUserBookings = async (userId) => {
  const res = await axios.get(`${API_BASE}/users/${userId}/bookings`);
  return res.data;
};

// Bookings on a specific property
export const getPropertyBookings = async (propertyId) => {
  try {
    const res = await axios.get(
      `${API_BASE}/properties/${propertyId}/bookings`
    );
    return res.data;
  } catch (err) {
    console.error(`Failed to fetch bookings for property ${propertyId}`, err);
    return { bookings: [] };
  }
};
export const createBooking = async (propertyId, bookingData) => {
  const res = await axios.post(
    `${API_BASE}/properties/${propertyId}/booking`,
    bookingData
  );
  return res.data;
};

// ---------------- REVIEWS ----------------
export const getPropertyReviews = async (propertyId) => {
  try {
    const res = await axios.get(
      `http://localhost:9090/api/properties/${propertyId}/reviews`
    );
    return res.data.reviews || [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const deleteReview = async (reviewId) => {
  const res = await axios.delete(`${API_BASE}/reviews/${reviewId}`);
  return res.data;
};

// Post a review for a property
export const postReview = async (propertyId, reviewData) => {
  const res = await axios.post(
    `${API_BASE}/properties/${propertyId}/reviews`,
    reviewData
  );
  return res.data;
};
// ---------------- USER PROFILE ----------------

export const updateUser = async (userId, updatedData) => {
  const res = await axios.patch(`${API_BASE}/users/${userId}`, updatedData);
  return res.data;
};

export const getUser = async (userId) => {
  const res = await axios.get(`${API_BASE}/users/${userId}`);
  return res.data;
};

// ---------------- FAVOURITES ----------------
export const toggleFavourite = async (propertyId, guestId) => {
  const res = await axios.post(
    `${API_BASE}/properties/${propertyId}/favourite`,
    { guest_id: guestId }
  );
  return res.data;
};

export const getUserFavourites = async (userId) => {
  const res = await axios.get(`${API_BASE}/users/${userId}/favourites`);
  return res.data;
};
