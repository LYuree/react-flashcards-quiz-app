import React, { useState, useEffect, useRef} from 'react'
import FlashcardList from './FlashcardList';
import axios from 'axios';
import './app.css'

export default function App() {
  // const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const categoryEl = useRef();

  useEffect(() => {
    axios
    .get('https://opentdb.com/api_category.php')
    .then(res => {
        // debugger;
        setCategories(res.data.trivia_categories);
      })
    },[]);

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

  function handleSubmit(e){
    e.preventDefault();
  }


  return (
    <>
    <form action="" className="header" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select name="" id="category" ref={categoryEl}>
          {categories.map(category => {
            return <option value={category.id} key={category.id}>{category.name}</option>
          })}
        </select>
        <label htmlFor=""></label>
        <input type="number" name="" id="" />
        <button type="submit"></button>
        
      </div>
    </form>
      <div className="container">
        <FlashcardList flashcards={flashcards}></FlashcardList>
      </div>
    </>
  );
}




