import { useState } from 'react';

const questions = [
  {
    question: 'Which is the most popular JavaScript framework?',
    options: ['Angular', 'React', 'Svelte', 'Vue'],
    correctOption: 1,
    points: 10,
  },
];

function App() {
  const [isStarted, setIsStarted] = useState(false);
  return (
    <div>
      <Header />
      <Main>
        <Welcome />
        {isStarted && (
          <>
            <Qustion />
            <div className='btn-container'>
              <button className='btn btn-timer'>06:17</button>
              <button className='btn btn-next'>Next</button>
            </div>
          </>
        )}
      </Main>
    </div>
  );
}

function Header() {
  return (
    <header className='header'>
      <div className='img-container'>
        <img src='logo192.png' alt='logo' />
      </div>
      <h1>The React Quiz</h1>
    </header>
  );
}

function Main({ children }) {
  return <main className='main'>{children}</main>;
}

function Welcome() {
  return (
    <div className='Welcome'>
      <h2>Welcome to the react quiz</h2>
      <h3>
        <span>15</span> Questions To Test Your React Mastery!
      </h3>
      <button className='btn btn-start'>Let's Start</button>
    </div>
  );
}

function Qustion() {
  return (
    <div className='question-container'>
      <p>{questions[0].question}</p>
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
      </div>
    </div>
  );
}

export default App;
