const config = require('config');
const prompt = require('prompt-sync')();
const apiService = require('./api.service')

class AuthService {
  constructor() {
    this.token = ''
  }

  authenticate = async () =>  {
    const body = {
      client_id: config.get('clientId'),
      ...this._getEmailAndName()
    }

    const data = await apiService.post(`/assignment/register`, {
      body: JSON.stringify(body),
    })

    if (data && !data.error) {
      this.token = data.data.sl_token
      console.log('Successfully got token')
    }
  }

  _getEmailAndName = () => {
    let email = config.get('email'),
        name = config.get('name');

    const inputEmail = prompt(`Enter your email(default is "${email}"):`);
    const inputName = prompt(`Enter your name(default is "${name}"):`);

    return { email: inputEmail.trim() || email, name: inputName.trim() || name };
}

  getToken = () => this.token
}

module.exports = new AuthService()
