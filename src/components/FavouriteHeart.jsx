import React from "react";
import '../App.css';

const FavouriteHeart = ({ isFavourite, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="favourite-heart"
      type="button"
    >
      {isFavourite ? "❤️" : "🤍"}
    </button>
  );
};

export default FavouriteHeart;

