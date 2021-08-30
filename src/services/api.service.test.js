const apiService = require('./api.service')
const config = require('config');
const fetch = require('node-fetch');

jest.mock('node-fetch');

describe('apiService', () => {
    test('apiService.get successfully make request', async () => {
        const resp = { json: jest.fn()}
        fetch.mockResolvedValue(resp);
        await apiService.get('/users', { test: 'test'})

        expect(fetch).toBeCalledWith('https://example.com/users', { method: 'GET', test: 'test'})
        expect(resp.json).toBeCalled()
    })

    test('apiService.post successfully make request', async () => {
        const resp = { json: jest.fn()}
        fetch.mockResolvedValue(resp);
        await apiService.post('/users', { test: 'test'})

        expect(fetch).toBeCalledWith('https://example.com/users', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            test: 'test'
        })
        expect(resp.json).toBeCalled()
    })
})
