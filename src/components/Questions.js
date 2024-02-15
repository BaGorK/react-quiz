import Options from './Options';

function Questions({ question, dispatch, answer, points }) {
  return (
    <div className='question-container'>
      <p>{question.question}</p>
      <Options question={question} points={points} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Questions;
