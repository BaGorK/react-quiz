import { useEffect, useReducer } from 'react';

import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import Welcome from './components/Welcome';
import Questions from './components/Questions';
import NextButton from './components/NextButton';
import Timer from './components/Timer';
import Progress from './components/Progress';
import Finished from './components/Finished';

const SECONDS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  status: 'loading', // loading, error, ready, active, finished
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };

    case 'dataFaild':
      return { ...state, status: 'error' };

    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };

    case 'newAnswer': {
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }

    case 'nextQuestion':
      return { ...state, answer: null, index: state.index + 1 };

    case 'finished':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      };

    case 'restart':
      return { ...initialState, questions: state.questions, status: 'ready' };

    default:
      throw new Error('Action is unknown');
  }
};

function App() {
  const [
    { questions, status, index, answer, highscore, points, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('http://localhost:9000/questions')
      .then((res) => {
        if (!res.ok)
          throw new Error('Something went wrong with fetching the data');

        return res.json();
      })
      .then((data) => {
        dispatch({ type: 'dataReceived', payload: data });
      })
      .catch(() => {
        dispatch({ type: 'dataFaild' });
      });
  }, []);

  const maxValue = questions.reduce(
    (acc, curQuestion) => acc + curQuestion.points,
    0
  );
  const numQuestions = questions.length;

  return (
    <div>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <Welcome numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              maxValue={maxValue}
              points={points}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              points={points}
            />

            <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            <NextButton
              dispatch={dispatch}
              index={index}
              questions={questions}
              answer={answer}
            />
          </>
        )}

        {status === 'finished' && (
          <Finished
            points={points}
            dispatch={dispatch}
            maxPossiblePoints={maxValue}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
