import axios from 'axios';
import sha1 from 'sha1';

class Api {
  constructor(privateKey, publicKey) {
    this._privateKey = privateKey;
    this._publicKey = publicKey;
  }

  async getSomeAmountOfOrders(numberOfOrders, status) {
    let orders = [];
    try {
      const requestTokenServerResponse = await this._getRequestTokenServerResponse();
      const requestToken = requestTokenServerResponse.data.RequestToken;
      const accessTokenServerResponse = await this._getAccessTokenServerResponse(requestToken, this._privateKey, this._publicKey);
      const accessToken = accessTokenServerResponse.data.AccessToken;
      const ordersDataObject = await this._getOrdersDataObject(accessToken, numberOfOrders, status);
      orders = ordersDataObject.data.Result;
    } catch(error) {
      console.log(error);
    }
    return orders;
  }

  _getRequestTokenServerResponse() {
    return axios.get('http://api.pixlpark.com/oauth/requesttoken');
  }

  _getAccessTokenServerResponse(requestToken, privateKey, publicKey) {
    return axios.get('http://api.pixlpark.com/oauth/accesstoken', {
      params: {
        oauth_token: requestToken,
        grant_type: 'api',
        username: this._publicKey,
        password: this._getPassword(requestToken, this._privateKey),
      }
    });
  }

  _getOrdersDataObject(accessToken, numberOfOrders, status) {
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

  _getPassword(requestToken, privateKey) {
    return sha1(`${requestToken}${privateKey}`);
  }
}

export default Api;
