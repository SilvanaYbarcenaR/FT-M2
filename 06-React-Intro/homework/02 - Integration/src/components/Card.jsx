const Card = ({characters, onClose}) => {
   return (
      <>
         {
            characters.map(character => {
               return (
                  <div key={character.id}>
                     <button onClick={onClose}>X</button>
                     <h2>{character.name}</h2>
                     <h2>{character.status}</h2>
                     <h2>{character.species}</h2>
                     <h2>{character.name.origin}</h2>
                     <h2>{character.gender}</h2>
                     <img src={character.image} alt={character.name} />
                  </div>
               )
            })
         }
      </>
   );
}

export default Card;