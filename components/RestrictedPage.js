import Counter from './count-down/CountDown';

const restrictedPage = ({ birthday }) => {
  return (
    <div className="jumbotron" >
      <Counter birthday={birthday}/>
    </div>
  );
};

export default restrictedPage;