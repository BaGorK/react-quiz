import { useEffect, useReducer, useState } from 'react';

import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import Welcome from './components/Welcome';
import Questions from './components/Questions';
import NextButton from './components/NextButton';
import Timer from './components/Timer';
import Progress from './components/Progress';

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
    case 'nexQuestion':
      return { ...state, answer: null, index: state.index + 1 };

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
      .then((res) => {
        if (!res.ok) throw new Error('Something went wrong with fetching the data');

        return res.json();
      })
      .then((data) => {
        dispatch({ type: 'dataReceived', payload: data });
      })
      .catch((err) => {
        console.log('emoji', err.props.children[1]);
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
          <>
            <Progress index={index} questions={questions} points={points} answer={answer} />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              points={points}
            />

            <Timer />
            <NextButton dispatch={dispatch} answer={answer} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
