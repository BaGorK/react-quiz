import { useEffect, useReducer, useState } from 'react';

import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import Welcome from './components/Welcome';
import Questions from './components/Questions';

const initialState = {
  questions: [],

  status: 'loading', // loading, erro, ready, active, finished
  index: 0,
  answer: null,
  points: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFaild':
      return { ...state, status: 'error' };

    case 'start':
      return { ...state, status: 'active' };

    case 'newAnswer': {
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption ? state.points + question.points : state.points,
      };
    }

    default:
      throw new Error('Action is unknown');
  }
};

function App() {
  const [{ questions, status, index, answer, points }, dispatch] = useReducer(
    reducer,
    initialState
  );

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
        {status === 'ready' && <Welcome numQuestions={questions.length} dispatch={dispatch} />}
        {status === 'active' && (
          <Questions
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
            points={points}
          />
        )}
        {/* 
        <div className='btn-container'>
          <button className='btn btn-timer'>06:17</button>
          <button className='btn btn-next'>Next</button>
        </div> */}
      </Main>
    </div>
  );
}

export default App;
