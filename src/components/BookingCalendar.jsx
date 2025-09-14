import { useState } from "react";

export default function BookingCalendar() {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const propertyId = 9; // hardcoded property ID

  const handleBooking = async () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select check-in and check-out dates");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:9090/api/properties/${propertyId}/booking`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            guest_id: 1, 
            check_in_date: checkInDate,
            check_out_date: checkOutDate,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || "Booking failed!");
      alert(`Booking successful! ID: ${data.booking_id}`);
    } catch (err) {
      console.error(err);
      alert(err.message);
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
