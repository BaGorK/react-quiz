function Welcome({ numQuestions, dispatch }) {
  return (
    <div className='Welcome'>
      <h2>Welcome to the react quiz</h2>
      <h3>
        <span>{numQuestions}</span> Questions To Test Your React Mastery!
      </h3>
      <button className='btn btn-start' onClick={() => dispatch({ type: 'start' })}>
        Let's Start
      </button>
    </div>
  );
}

export default Welcome;
