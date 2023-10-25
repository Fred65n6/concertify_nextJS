import React from "react";

const userFavourites = () => {
  return (
    <>
      <h1 className="font-bold text-4xl pb-4">Favourites</h1>
      <div className="grid xs:grid-cols1 sm:grid-cols-3 md:grid-cols-4 gap-8 mt-8"></div>
    </>
  );
};

export default userFavourites;
