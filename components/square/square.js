import style from './square.module.css';

const Square = ({ number, label }) => {
  return (
    <div className='d-flex flex-column'>
      <div className={`mx-1 ${style.square}`}>
        <span className={style.number}>{number}</span>
      </div>
      <div>
        <span className={style.small}>
          <small className={style.label}>{label}</small>
        </span>
      </div>
    </div>
  );
};

export default Square;