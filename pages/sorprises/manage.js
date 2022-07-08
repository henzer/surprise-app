import 'bootstrap/dist/css/bootstrap.css';
import data from '../../utils/data.json';

import { useState } from 'react';

const getMessages = (selected) => {
  const messages = data[selected].messages;
  return messages.map((message, index) => {
    return <li key={index} className='list-group-item'>{message}</li>;
  });
};

const Manage = () => {
  const [ selected, setSelected ] = useState(Object.keys(data)[0]);

  const getItems = (selected) => {
    return Object.keys(data).map((key) => {
      const activeClass = (selected === key) ? 'active' : '';
      return (
        <a
          key={key}
          href='#'
          className={`list-group-item list-group-item-action ${activeClass}`}
          onClick={() => setSelected(key)}>
          {key}
        </a>
      );
    });
  };

  return (
    <>
      <h1>Paginas</h1>
      <div className='container'>
        <div className='row'>
          <div className='col-sm'>
            <div className='list-group'>
              {getItems(selected)}
            </div>
          </div>
          <div className='col-sm'>
            <ul className='list-group'>
              {getMessages(selected)}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manage;