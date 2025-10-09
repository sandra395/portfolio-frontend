import React from "react";
import "../App.css";

const FavouriteHeart = ({ isFavourite, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`favourite-heart ${isFavourite ? "filled" : "outline"}`}
      type="button"
    />
  );
};

export default FavouriteHeart;
