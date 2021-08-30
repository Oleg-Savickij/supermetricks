const apiService = require('./api.service');
const authService = require('./auth.service');

class PostsService {
    getPosts = async page => {
        const data = await apiService.get(`/assignment/posts?page=${page}&sl_token=${authService.getToken()}`)
        if (data && !data.error) {
            console.log(`Successfully loaded ${page} page`)
            return data.data
        }
    }
}

module.exports = new PostsService()

