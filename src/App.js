import { useEffect, useReducer, useState } from 'react';

import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import Welcome from './components/Welcome';

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

  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('http://localhost:9000/questions')
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'dataReceived', payload: data });
      })
      .catch((err) => {
        dispatch({ type: 'dataFaild' });
      });
  }, []);

  return (
    <div>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <Welcome numQuestions={questions.length} />}
        {/* <Welcome />
        <Qustion />
        <div className='btn-container'>
          <button className='btn btn-timer'>06:17</button>
          <button className='btn btn-next'>Next</button>
        </div> */}
      </Main>
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
