
import React from "react";

const FavouriteHeart = ({ isFavourite, onClick }) => {
  return <button onClick={onClick}>{isFavourite ? "❤️" : "🤍"}</button>;
};

export default FavouriteHeart;
