import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

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
    fetch(`http://localhost:9090/api/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setEditData({
            first_name: data.user.first_name,
            surname: data.user.surname,
            email: data.user.email,
            phone_number: data.user.phone_number,
          });
        }
      })
      .catch((err) => console.error("Error fetching user info:", err));
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:9090/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.msg || "Update failed");
 
      
 alert("Profile updated successfully!");
 navigate(`/profile`);
} catch (err) {
  console.error("Error updating profile:", err);
  alert("Failed to update profile");
}
};

  return (
    <div>
      <Header />
      <h2>Edit Profile</h2>

      <label>
        First Name:{" "}
        <input
          type="text"
          name="first_name"
          value={editData.first_name}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Surname:{" "}
        <input
          type="text"
          name="surname"
          value={editData.surname}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Email:{" "}
        <input
          type="email"
          name="email"
          value={editData.email}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Phone:{" "}
        <input
          type="text"
          name="phone_number"
          value={editData.phone_number}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <button onClick={handleSave}>Save</button>
      <button onClick={() => navigate(-1)}>
        Cancel
      </button>
      <hr />
      <Footer />
    </div>
  );
};

export default EditProfile;
