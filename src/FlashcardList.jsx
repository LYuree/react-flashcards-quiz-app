import React from 'react'
import Flashcard from './Flashcard';

export default function FlashcardList({ flashcards }) {
  return (
    <div className="container">
      <div className="card-grid">
        {flashcards.map(flashcard => {
          return <Flashcard flashcard={flashcard} key={flashcard.id} />
        })}
      </div>
    </div>
  )
}

// import React from "react";

// function FlashcardList() {
//     return ( <></> );
// }

// export default FlashcardList;