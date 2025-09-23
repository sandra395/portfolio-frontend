import React, { useState, useEffect } from "react";
import { updateUser } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import "../App.css";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";

const EditProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [editData, setEditData] = useState({
    first_name: "",
    surname: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser(userId);
        if (data.user) {
          setEditData({
            first_name: data.user.first_name,
            surname: data.user.surname,
            email: data.user.email,
            phone_number: data.user.phone_number,
          });
        }
      } catch (err) {
        console.error("Error fetching user info:", err);
        alert("Failed to fetch user info");
      }
    };

    fetchUser();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUser(userId, editData);
      alert("Profile updated successfully!");
      navigate(`/profile/${userId}`);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <div className="edit-profile-row">
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={editData.first_name}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div className="edit-profile-row">
          <label>Surname:</label>
          <input
            type="text"
            name="surname"
            value={editData.surname}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div className="edit-profile-row">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={editData.email}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <div className="edit-profile-row">
          <label>Phone:</label>
          <input
            type="text"
            name="phone_number"
            value={editData.phone_number}
            onChange={handleInputChange}
          />
        </div>
        <br />
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
