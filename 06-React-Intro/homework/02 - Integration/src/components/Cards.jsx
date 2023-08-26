import Card from './Card';

const Cards = ({characters}) => {
   return (
      <div>
         <Card characters={characters} onClose={() => window.alert('Emulamos que se cierra la card')} />
      </div>
   )
}

export default Cards;