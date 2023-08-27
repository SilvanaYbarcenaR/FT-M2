import React from "react";
import styledSpecies from "./Species.module.css";

export default function Species({ species, handleSpecies, handleAllSpecies }) {
  return (
    <div className={styledSpecies.divContent}>
      <h2>Species</h2>
      <div>
        {
          species.map((specie, index) => {
            return (
              <button key={index} onClick={handleSpecies} value={specie}>{specie}</button>
            )
          })
        }
        <button onClick={handleAllSpecies}>All animals</button>
      </div>
    </div>
  )
}
