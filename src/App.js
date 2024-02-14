const questions = [
  {
    question: 'Which is the most popular JavaScript framework?',
    options: ['Angular', 'React', 'Svelte', 'Vue'],
    correctOption: 1,
    points: 10,
  },
];

function App() {
  return (
    <div className='App'>
      <header className='header'>
        <div className='img-container'>
          <img src='logo192.png' alt='logo' />
        </div>
        <h1>The React Quiz</h1>
      </header>

      <main className='main'>
        <div className='question-container'>
          <p>Which is the most popular JavaScript framework?</p>
          <div>
            <span role='button' className='choice'>
              State
            </span>
            <span role='button' className='choice'>
              Props
            </span>
            <span role='button' className='choice'>
              PropTypes
            </span>
            <span role='button' className='choice'>
              Parameters
            </span>
          </div>
        </div>
        <div className='btn-container'>
          <button className='btn btn-timer'>06:17</button>
          <button className='btn btn-next'>Next</button>
        </div>
      </main>
    </div>
  );
}

export default App;
