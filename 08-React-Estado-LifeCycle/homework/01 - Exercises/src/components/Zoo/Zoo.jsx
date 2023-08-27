import React, { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import Animals from "../Animals/Animals";
// eslint-disable-next-line no-unused-vars
import Species from "../Species/Species";
import { isSpace } from "markdown-it/lib/common/utils";
import styledZoo from "./Zoo.module.css";

export default function Zoo() {
  /* Escribe acá tu código */
  const [zoo, setZoo] = React.useState({
    zooName: "",
    animals: [],
    species: [],
    allAnimals: []
  })

  const handleInputChange = (event) => {
    setZoo({
      ...zoo,
      zooName: event.target.value
    })
  }

  const handleSpecies = (event) => {
    const isSpecie = zoo.allAnimals.filter(animal => {
      return animal.specie === event.target.value; 
    })

    setZoo({
      ...zoo,
      animals: isSpecie
    })
  }

  const handleAllSpecies = () => {
    setZoo({
      ...zoo,
      animals: zoo.allAnimals
    })
  }

  React.useEffect(() => {
    fetch('http://localhost:3001/zoo')
   .then((res) => res.json())
   .then((data) =>
      setZoo({
         ...zoo,
         animals: data.animals,
         species: data.species,
         allAnimals: data.animals,
      })
   )
   .catch((error) => console.log(error));
  }, [])

  return (
    <div className={styledZoo.divContent}>
      <div className={styledZoo.divContentTitle}>
        <label>Zoo Name:</label>
        <input value={zoo.zooName} onChange={handleInputChange} />
        <h1 className={styledZoo.title}>{zoo.zooName}</h1>
      </div>
      <Species species={zoo.species} handleSpecies={handleSpecies} handleAllSpecies={handleAllSpecies} />
      <Animals animals={zoo.animals} />
    </div>
  );
}
