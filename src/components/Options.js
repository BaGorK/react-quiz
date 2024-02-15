function Options({ question, dispatch, answer, points }) {
  return (
    <div>
      {question.options.map((opt, index) => (
        <button
          className={`choice ${index === answer ? 'choice-answer' : ''} ${
            answer === null
              ? ''
              : index === question.correctOption
              ? 'choice-correct'
              : 'choice-wrong'
          } `}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
          key={index}
          disabled={answer !== null}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default Options;
