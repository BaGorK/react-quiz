import { useEffect, useReducer, useState } from 'react';

import Header from './components/Header';
import Main from './components/Main';

const initialState = {
  questions: [],

  status: 'loading', // loading, erro, ready, active, finished
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFaild':
      return { ...state, status: 'error' };

    default:
      throw new Error('Action is unknown');
  }
};

function App() {
  const [isStarted, setIsStarted] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('http://localhost:9000/questions')
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'dataReceived', payload: data });
      })
      .catch((err) => {
        dispatch({ type: 'dataFaild' });
      });
  });

  return (
    <div>
      <Header />
      <Main>
        <Welcome />
        <Qustion />
        <div className='btn-container'>
          <button className='btn btn-timer'>06:17</button>
          <button className='btn btn-next'>Next</button>
        </div>
      </Main>
    </div>
  );
}

function Welcome() {
  return (
    <div className='Welcome'>
      <h2>Welcome to the react quiz</h2>
      <h3>
        <span>15</span> Questions To Test Your React Mastery!
      </h3>
      <button className='btn btn-start'>Let's Start</button>
    </div>
  );
}

function Qustion() {
  return (
    <div className='question-container'>
      {/* <p>{questions[0].question}</p>
      <div>
        <span role='button' className='choice'>
          {questions[0].options[0]}
        </span>
        <span role='button' className='choice'>
          {questions[0].options[1]}
        </span>
        <span role='button' className='choice'>
          {questions[0].options[2]}
        </span>
        <span role='button' className='choice'>
          {questions[0].options[3]}
        </span>
      </div> */}
    </div>
  );
}

export default App;
