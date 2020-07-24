import React from 'react';
import { block } from 'bem-cn';

import './Order.css';

const b = block('order');

class Order extends React.Component {
  state = {
    isOrderOpen: false,
  };

  render() {
    const { item: {
      Id,
      Title,
      Status,
      PaymentStatus,
      TotalPrice,
      DeliveryAddress,
    }} = this.props;

    const { isOrderOpen } = this.state;

    return (
      <div className={b()}>
        <div className={b('header')}>
          <div className={b('id')}>
            {Id}
          </div>
          <div className={b('title')}>
            {Title}
          </div>
          <div className={b('status')}>
            {Status}
          </div>
          <div className={b('payment-status')}>
            {PaymentStatus}
          </div>
          <button className={b('collapse-button')} onClick={this.handleCollapseButtonClick}>{isOrderOpen ? '-' : '+'}</button>
        </div>
        <div className={b('content', { visible: isOrderOpen })}>
          {DeliveryAddress &&
            <div>
              <div className={b('country')}>{`Страна: ${DeliveryAddress.Country}`}</div>
              <div className={b('city')}>{`Город: ${DeliveryAddress.City}`}</div>
              <div className={b('full-name')}>{`ФИО: ${DeliveryAddress.FullName}`}</div>
              <div className={b('e-mail')}>{`e-mail: ${DeliveryAddress.AddressLine1}`}</div>
              <div className={b('telephone')}>{`Телефон: ${DeliveryAddress.Phone}`}</div>
            </div>
          }
          <div className={b('price')}>{`Цена: ${TotalPrice}`}</div>
        </div>
        
      </div>
    );
  }

  handleCollapseButtonClick = () => {
    this.setState(state => ({
      isOrderOpen: !state.isOrderOpen,
    }));
  }
}

export default Order;