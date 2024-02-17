function Progress({ numQuestions, index, points, answer, maxValue }) {
  return (
    <div className='progress'>
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Questions <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        Points <strong>{points}</strong> / {maxValue}
      </p>
    </div>
  );
}

export default Progress;
