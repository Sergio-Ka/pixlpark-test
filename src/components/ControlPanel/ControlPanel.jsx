import React from 'react';
import { block } from 'bem-cn';

import './ControlPanel.css';

const b = block('control-panel');

class ControlPanel extends React.Component {

  render() {
    const {
      onLoadButtonClickHandler,
      onInputChangeHandler,
      onSelectChangeHandler,
      status,
      numberOfOrders,
    } = this.props;

    return (
      <div className={b()}>
        <div className={b('header')}>
          {'Фильтры'}
        </div>
        <div className={b('filter')}>{'Статус: '}
          <select value={status} onChange={onSelectChangeHandler}>
            <option value="NotProcessed">Не обработан</option>
            <option value="Cancelled">Отменен</option>
            <option value="Printing">Напечатан</option>
          </select>
        </div>
        <div className={b('order-number')}>{'Количество ордеров к загрузке: '}
          <input type='number' value={numberOfOrders} onChange={onInputChangeHandler}/>
        </div>
        <div className={b('button-wrapper')}>
          <button className={b('load-button')} onClick={onLoadButtonClickHandler}>{'Стянуть заказы с сервера'}</button>
        </div>
      </div>
    );
  }
}

export default ControlPanel;
