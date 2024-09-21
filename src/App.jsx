import React, { useState, useEffect } from 'react'
import FlashcardList from './FlashcardList';
import axios from 'axios';
import './app.css'


const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: "What is 2+2?",
    answer: "4",
    options : [
      '2',
      '3',
      '4',
      '5'
    ]
  },

  {
    id: 2,
    question: "What is 2+2?",
    answer: "Answer",
    options : [
      'Answer',
      'Answer 1',
      'Answer 2',
      'Answer 3'
    ]
  },

  {
    id: 3,
    question: "Question 2?",
    answer: "Answer",
    options : [
      'Answer',
      'Answer 1',
      'Answer 2',
      'Answer 3'
    ]
  }
];

export default function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);
  useEffect(() => {
    axios
    .get('https://opentdb.com/api.php?amount=10')
    .then(res => {
      // console.log(res.data); // yeah, actually 10
      setFlashcards(res.data.results.map((questionItem, index) => {
        const answer = questionItem.correct_answer
        const options = [...questionItem.incorrect_answers, answer];
        return {
          id: `${index}-${Date.now}`,
          question: decodeString(questionItem.question),
          answer: questionItem.correct_answer,
          options: options.sort(() => Math.random() - .5)
        }
      }))
    });
  }, []);

  function decodeString(str){
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;    
    // won't work :(
    // const textArea = <textarea>{str}</textarea>
    return textArea.value;
  }


  return (
    <FlashcardList flashcards={flashcards}></FlashcardList>
  );
}




