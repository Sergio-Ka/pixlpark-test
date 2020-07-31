import React from 'react';
import axios from 'axios';
import sha1 from 'sha1';
import { block } from 'bem-cn';

import ControlPanel from './components/ControlPanel/ControlPanel';
import OrdersList from './components/OrdersList/OrdersList';
import './Application.css';

const b = block('application');
const privateKey = '8e49ff607b1f46e1a5e8f6ad5d312a80';
const publicKey = '38cd79b5f2b2486d86f562e3c43034f8';

class Application extends React.Component {
  state = {
    ordersList: [],
    numberOfOrders: 10,
    status: 'NotProcessed',
  };

  componentDidMount() {
    const { numberOfOrders, status } = this.state;
    this.getSomeAmountOfOrders(numberOfOrders, status);
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
    this.getSomeAmountOfOrders(numberOfOrders, status);
  }

  handleInputChange = (event) => {
    this.setState({ numberOfOrders: event.target.value });
  }

  handleSelectChange = (event) => {
    this.setState({ status: event.target.value });
  }

  async getSomeAmountOfOrders(numberOfOrders, status) {
    let orders = {};
    try {
      const requestTokenServerResponse = await this.getRequestTokenServerResponse();
      const requestToken = requestTokenServerResponse.data.RequestToken;
      const accessTokenServerResponse = await this.getAccessTokenServerResponse(requestToken, privateKey, publicKey);
      const accessToken = accessTokenServerResponse.data.AccessToken;
      const ordersDataObject = await this.getOrdersDataObject(accessToken, numberOfOrders, status);
      orders = ordersDataObject.data.Result;
    } catch(error) {
      console.log(error);
    }
    this.setState({ ordersList: orders });
  }

  getRequestTokenServerResponse() {
    return axios.get('http://api.pixlpark.com/oauth/requesttoken');
  }

  getAccessTokenServerResponse(requestToken, privateKey, publicKey) {
    return axios.get('http://api.pixlpark.com/oauth/accesstoken', {
      params: {
        oauth_token: requestToken,
        grant_type: 'api',
        username: publicKey,
        password: this.getPassword(requestToken, privateKey),
      }
    });
  }

  getOrdersDataObject(accessToken, numberOfOrders, status) {
    return axios.get('http://api.pixlpark.com/orders', {
      params: {
        oauth_token: accessToken,
        take: numberOfOrders,
        skip: 0,
        status,
        // userId: 100,
        // shippingId: 200,
      }
    });
  }

  getPassword(requestToken, privateKey) {
    return sha1(`${requestToken}${privateKey}`);
  }
}

export default Application;
