const apiService = require('./api.service');
const postsService = require('./posts.service');
const authService = require('./auth.service');

jest.mock('./api.service');
jest.mock('./auth.service');

describe('postsService', () => {
    test('postsService.getPosts successfully make request', async () => {
        const resp = { data: 'test' }
        apiService.get.mockResolvedValue(resp);
        authService.getToken.mockReturnValue('testToken')
        const data = await postsService.getPosts(1)

        expect(apiService.get).toBeCalledWith('/assignment/posts?page=1&sl_token=testToken')
        expect(data).toBe('test')
    })

    test('postsService.getPosts return undefined on backend error', async () => {
        const resp = { error: 'test' }
        apiService.get.mockResolvedValue(resp);
        authService.getToken.mockReturnValue('testToken')
        const data = await postsService.getPosts(1)

        expect(apiService.get).toBeCalledWith('/assignment/posts?page=1&sl_token=testToken')
        expect(data).toBeUndefined()
    })
})
