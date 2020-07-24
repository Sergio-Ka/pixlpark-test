import React from 'react';
import { block } from 'bem-cn';

import OrdersList from './components/OrdersList/OrdersList';
import { initialData } from './constants.js';
import './Application.css';

const b = block('application');

class Application extends React.Component {
  state = {
    ordersList: initialData,
  };

  render() {

    return (
      <div className={b()}>
        <header className={b('header')}>Приложение для вывода данных о заказах Pixlpark</header>
        <button className={b('load-button')} onClick={this.handleLoadButtonClick}>{'Стянуть заказы с сервера'}</button>
        <div className={b('content')}>
          <div className={b('orders-list')}>
            <OrdersList data={this.state.ordersList} />
          </div>
        </div>
      </div>
    );
  }

  handleLoadButtonClick = () => {
    this.setState(state => ({
      isOrderOpen: !state.isOrderOpen,
    }));
  }
}

export default Application;
