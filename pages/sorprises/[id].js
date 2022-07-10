import { useRouter } from 'next/router';
import data from '../../utils/data.json';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { MdCake, MdEmojiEmotions, MdFlightTakeoff, MdInfo, MdStarRate, MdReportProblem } from "react-icons/md";
import Counter from '../../components/counter';
import cn from 'classnames';
import RestrictedPage from '../../components/RestrictedPage';

const iconMap = {
  'cake': <MdCake size='5em' color='white'/>,
  'happy': <MdEmojiEmotions size='5em' color='white'/>,
  'plane': <MdFlightTakeoff size='5em' color='white'/>,
  'info': <MdInfo size='5em' color='white'/>,
  'star': <MdStarRate size='5em' color='white'/>,
  'critical': <MdReportProblem size='5em' color='white'/>
};

const getIcon = (icon) => iconMap[icon]; 

const Surprise = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { messages, birthday } = props;
  const [active, setActive] = useState(0);
  const total = messages.length;

  const styleFullScreen = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  const center = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    margin: '0 40px'
  };

  const clickRight = () => {
    if (active >= messages.length - 1) {
      setActive(0);
      return;
    }
    setActive(active + 1);
  };
  const clickLeft = () => {
    if (active <= 0) {
      setActive(messages.length - 1);
      return;
    }
    setActive(active - 1);
  };

  const getItems = () => {
    return messages.map((message, index) => {
      const style = {
        height: '100%',
        backgroundColor: message.backgroundColor
      };
      const activeClass = index === active ? 'active' : '';
      return (
        <div key={index} className={`carousel-item ${activeClass}`} style={style}>
          <div className="jumbotron" style={center}>
            <div className='mx-5 text-center'>
              <h1 className="display-4" style={{ color: '#FFFFFF'}}>{message.title}</h1>
              <p className="lead" style={{ color: '#FFFFFF'}}>{message.body}</p>
              {getIcon(message.icon)}
            </div>
          </div>
        </div>
      );
    });
  };

  const controlClassesPrev = cn({
    'carousel-control-prev': true,
    'd-none': total === 1,
  });
  const controlClassesNext = cn({
    'carousel-control-next': true,
    'd-none': total === 1,
  });

  const birthdayDate = new Date(birthday);
  const today = new Date();
  const diffSeconds = Math.trunc((today - birthdayDate)/1000);
  const oneDay = 24 * 60 * 60 * 1000;
  if (diffSeconds < 0 || diffSeconds > (60 * 60 * 24) ) {
    return (
      <RestrictedPage birthday={birthdayDate}/>
    );
  }

  return (
    <>
      <div id="carouselControls" className='carousel slide' data-ride='carousel' style={styleFullScreen}>
        <div className='carousel-inner' style={styleFullScreen}>
          {getItems()}
          <a className={controlClassesPrev} href="#" onClick={() => clickLeft()} role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" ariaidden="true"></span>
          </a>
          <a className={controlClassesNext} href="#" onClick={() => clickRight()} role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </a>
          <Counter current={active + 1} total={total} />
        </div>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  const paths = Object.keys(data).map((key) => ({
    params: { id: key },
  }));
  return { paths, fallback: false };
};

export async function getStaticProps({ params }) {
  const page = data[params.id];
  return {
    props: { ...page }
  };
}

export default Surprise;