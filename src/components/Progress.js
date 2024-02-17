function Progress({ questions, index, points, answer }) {
  return (
    <div className='progress'>
      <progress max={questions.length} value={index + Number(answer !== null)} />
      <p>
        Questions <strong>{index + 1}</strong> / {questions.length}
      </p>
      <p>
        Points <strong>{points}</strong> / {questions.reduce((acc, val) => acc + val.points, 0)}
      </p>
    </div>
  );
}

export default Progress;
