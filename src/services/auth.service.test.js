const apiService = require('./api.service');
const authService = require('./auth.service');
const promptCreator = require('prompt-sync');

jest.mock('prompt-sync',
    () => {
        const mPrompt = jest.fn();
        return jest.fn(() => mPrompt);
    },
    { virtual: true },);
jest.mock('./api.service');

describe('authService', () => {
    test('authService.authenticate successfully make request with custom email and name', async () => {
        const resp = { data: { sl_token: 'test' } };
        apiService.post.mockResolvedValue(resp);
        const prompt = promptCreator();
        prompt.mockReturnValueOnce('email').mockReturnValueOnce('name');
        await authService.authenticate();

        expect(apiService.post).toBeCalledWith('/assignment/register', {
            body: JSON.stringify({
                client_id: 'test',
                email: 'email',
                name: 'name'
            })
        });
        expect(authService.token).toBe('test');
    })

    test('authService.authenticate successfully make request with default email and name', async () => {
        const resp = { data: { sl_token: 'test' } };
        apiService.post.mockResolvedValue(resp);
        const prompt = promptCreator();
        prompt.mockReturnValueOnce('').mockReturnValueOnce('');
        await authService.authenticate();

        expect(apiService.post).toBeCalledWith('/assignment/register', {
            body: JSON.stringify({
                client_id: 'test',
                email: 'example@gmail.com',
                name: 'John Wick'
            })
        });
        expect(authService.token).toBe('test');
    })
})
