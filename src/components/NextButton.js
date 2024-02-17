function NextButton({ dispatch, questions, answer, index }) {
  if (answer === null) return;

  if (index < questions.length - 1)
    return (
      <button className='btn btn-next' onClick={() => dispatch({ type: 'nextQuestion' })}>
        Next
      </button>
    );

  if (index === questions.length - 1)
    return (
      <button className='btn btn-next' onClick={() => dispatch({ type: 'finished' })}>
        finish
      </button>
    );
}

export default NextButton;
