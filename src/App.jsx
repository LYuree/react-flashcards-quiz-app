import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <h1>
      Hello!
    </h1>
  )
}

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
]

export default App
