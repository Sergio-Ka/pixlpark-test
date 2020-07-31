import React from 'react';
import { block } from 'bem-cn';

import ControlPanel from './components/ControlPanel/ControlPanel';
import OrdersList from './components/OrdersList/OrdersList';
import Api from './api/api';
import './Application.css';

const b = block('application');
const privateKey = '8e49ff607b1f46e1a5e8f6ad5d312a80';
const publicKey = '38cd79b5f2b2486d86f562e3c43034f8';
const api = new Api(privateKey, publicKey);

class Application extends React.Component {
  state = {
    ordersList: [],
    numberOfOrders: 10,
    status: 'NotProcessed',
  };

  componentDidMount() {
    const { numberOfOrders, status } = this.state;
    api.getSomeAmountOfOrders(numberOfOrders, status)
      .then(orders => this.setState({ ordersList: orders }));
  }

  render() {
    const { ordersList, numberOfOrders, status } = this.state;

    return (
      <div className={b()}>
        <header className={b('header')}>Приложение для вывода данных о заказах Pixlpark</header>
        <div className={b('panel')}>
          <ControlPanel
            onLoadButtonClickHandler={this.handleLoadButtonClick}
            onInputChangeHandler={this.handleInputChange}
            onSelectChangeHandler={this.handleSelectChange}
            status={status}
            numberOfOrders={numberOfOrders} />
        </div>
        <div className={b('content')}>
          <div className={b('orders-list')}>
            <OrdersList data={ordersList} />
          </div>
        </div>
      </div>
    );
  }

  handleLoadButtonClick = () => {
    const { numberOfOrders, status } = this.state;
    api.getSomeAmountOfOrders(numberOfOrders, status)
      .then(orders => this.setState({ ordersList: orders }));
  }

  handleInputChange = (event) => {
    this.setState({ numberOfOrders: event.target.value });
  }

  handleSelectChange = (event) => {
    this.setState({ status: event.target.value });
  }
}

export default Application;
