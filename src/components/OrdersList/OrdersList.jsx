import React from 'react';
import { block } from 'bem-cn';

import Order from './Order/Order';

import './OrdersList.css';

const b = block('order-list');

class OrdersList extends React.Component {

  render() {
    const { data } = this.props;

    return (
      <div className={b()}>
        <div className={b('header')}>
          {'Заказы'}
        </div>
        {data.length !== 0 && data.map((child, index) => {
          return (
            <div className={b('content')} key={index}>
              <Order item={child} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default OrdersList;
