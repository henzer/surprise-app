import { useRouter } from 'next/router';
import data from '../../utils/data.json';
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from 'react';
import { MdCake, MdEmojiEmotions, MdFlightTakeoff, MdInfo, MdStarRate, MdReportProblem } from "react-icons/md";

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
  const { messages } = props;
  const [active, setActive] = useState(0);

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
    margin: '0 50px'
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

  // return messages.map((message, index) => (<p key={index}>{message}</p>));
  return (
    <>
      <div id="carouselControls" className='carousel slide' data-ride='carousel' style={styleFullScreen}>
        <div className='carousel-inner' style={styleFullScreen}>
          {getItems()}
          <a className="carousel-control-prev" href="#" onClick={() => clickRight()} role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" ariaidden="true"></span>
          </a>
          <a className="carousel-control-next" href="#" onClick={() => clickRight()} role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </a>
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