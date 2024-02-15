function NextButton({ dispatch, answer }) {
  if (answer === null) return;

  return (
    <button className='btn btn-next' onClick={() => dispatch({ type: 'nexQuestion' })}>
      Next
    </button>
  );
}

export default NextButton;
