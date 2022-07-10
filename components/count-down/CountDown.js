import { useTimer } from 'react-timer-hook';

import style from './style.module.css';
import { MdOutlineLockClock } from 'react-icons/md';
import Square from '../square/square';

const CountDown = ({ birthday }) => {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp: birthday, onExpire: () => {
    console.warn('onExpire called');
    window.location.reload();
  }});

  // const today = new Date();
  // const diff = Math.abs(today.getTime() - birthday.getTime());
  // const seconds = Math.trunc(diff/1000);
  // const minutes = Math.trunc(diff/(1000 * 60));
  // const hours = Math.trunc(diff/(1000 * 60 * 60));
  // const days = Math.trunc(diff/(1000 * 60 * 60 * 24));

  const formatNumber = (number) => {
    return number.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping:false
    });
  };

  return (
    <div className={`text-center ${style.container}`}>
      <div className='mb-4 px-4'>
        <div className='mb-3'><MdOutlineLockClock size='5em' color='white'/></div>
        <h1 className='display-3'>¿Haciendo trampa?</h1>
        <p className='mb-3 lead'>Para poder ver la sorpresa, debes esperar:</p>
        <div className='d-flex justify-content-center'>
          <Square number={days} label="DIA"/>
          <Square number={formatNumber(minutes)} label="HORA" />
          <Square number={formatNumber(minutes)} label="MIN" />
          <Square number={formatNumber(seconds)} label="SEG" />
        </div>
      </div>
    </div>
  );
};

export default CountDown;