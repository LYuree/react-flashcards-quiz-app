import React, { useState, useEffect, useRef} from 'react'
import FlashcardList from './FlashcardList';
import axios from 'axios';
import './app.css'

export default function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);
  const categoryEl = useRef();
  const amountEl = useRef(); //usr snippet

  useEffect(() => {
    axios
    .get('https://opentdb.com/api_category.php')
    .then(res => {
        // debugger;
        setCategories(res.data.trivia_categories);
      })
    },[]);

  // useEffect(() => {
  //   axios
  //   .get('https://opentdb.com/api.php?amount=10')
  //   .then(res => {
  //     // console.log(res.data); // yeah, actually 10
  //     setFlashcards(res.data.results.map((questionItem, index) => {
  //       const answer = questionItem.correct_answer
  //       const options = [...questionItem.incorrect_answers, answer];
  //       return {
  //         id: `${index}-${Date.now}`,
  //         question: decodeString(questionItem.question),
  //         answer: questionItem.correct_answer,
  //         options: options.sort(() => Math.random() - .5)
  //       }
  //     }))
  //   });
  // }, []);

  function decodeString(str){
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;    
    // won't work :(
    // const textArea = <textarea>{str}</textarea>
    return textArea.value;
  }

  function handleSubmit(e){
    e.preventDefault();
    axios
    .get('https://opentdb.com/api.php', {
      params: {
        amount: amountEl.current.value,
        category: categoryEl.current.value
      }
    })
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
        </div>
        <div className="form-group">
          <label htmlFor="amount">Number of questions</label>
          <input type="number" name="" id="amount" min="1" max="50" step="1" defaultValue={10} ref={amountEl}/>
          <button className="btn">Generate</button>
        </div>
        <div className="form-group">
        </div>
        
    </form>
      <div className="container">
        <FlashcardList flashcards={flashcards}></FlashcardList>
      </div>
    </>
  );
}




