import Counter from './count-down/CountDown';

const restrictedPage = (props) => {
  const { birthday, errorMessages } = props;
  const { title, message } = errorMessages[0];
  return (
    <div className="jumbotron" >
      <Counter birthday={birthday} title={title} message={message} />
    </div>
  );
};

export default restrictedPage;