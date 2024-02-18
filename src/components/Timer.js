import { useEffect } from 'react';

function Timer({ dispatch, secondsRemaining }) {
  const minutes = Math.floor(secondsRemaining / 60);
  const secondes = secondsRemaining % 60;

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'tick' });
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <button className='btn btn-timer'>
      {`${minutes}`.padStart(2, '0')}:{`${secondes}`.padStart(2, '0')}
    </button>
  );
}

export default Timer;
