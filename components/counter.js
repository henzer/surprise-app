import styles from './counter.module.css';
import cn from 'classnames';

const counter = ({ current, total }) => {

  return (
    <div className={styles.counter}>
      <h1 className={cn({
        'display-4 m-4': true,
        'd-none': total === 1,
      })}>{`${current}/${total}`}</h1>
    </div>
  );
};

export default counter;