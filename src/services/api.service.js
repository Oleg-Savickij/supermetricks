const config = require('config');
const fetch = require('node-fetch');

class ApiService {
    constructor() {
        this.host = config.get('supermetrics_api')
    }

    get = async (urlPrefix, options) => {
        try {
            const res = await fetch(`${this.host}${urlPrefix}`, { method: 'GET', ...options});

            return await res.json();
        }
        catch (e) {
            console.error(`Error during getting request from ${this.host}${urlPrefix}} \n ${e}`)
        }
    }

    post = async (urlPrefix, options) => {
        try {
            const res = await fetch(`${this.host}${urlPrefix}`, {
                headers: { "Content-Type": "application/json" },
                method: 'POST',
                ...options
            });
            return await res.json();
        }
        catch (e) {
            console.error(`Error during getting request from ${this.host}${urlPrefix}} \n ${e}`)
        }
    }
}

module.exports = new ApiService()
