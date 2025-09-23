import { useState } from "react";
import "../App.css";
import axios from "axios";
import { createBooking } from "../api";

export default function BookingCalendar() {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const propertyId = 9;

  const handleBooking = async () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select check-in and check-out dates");
      return;
    }

    try {
      const data = await createBooking(propertyId, {
        guest_id: currentUser.id,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
      });

      alert(`Booking successful! ID: ${data.booking_id}`);
      setCheckInDate("");
      setCheckOutDate("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Book Property</h2>
      <label>
        Check-in:
        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
        />
      </label>
      <br />
      <label>
        Check-out:
        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleBooking}>Book Now</button>
    </div>
  );
}
