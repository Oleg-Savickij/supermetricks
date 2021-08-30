const authService = require('./services/auth.service');
const postsService = require('./services/posts.service');
const AggregationService = require('./services/aggregation.service');
const fse = require('fs-extra');
const aggregationService = new AggregationService();
require('./helpers/polyfills');

const start = async () => {
    await authService.authenticate()

    if (authService.getToken()) {
        for (let i = 1; i < 11; i++) {
            const { posts = [] } = await postsService.getPosts(i)
            posts.forEach(post => aggregationService.processPost(post))
        }

        const result = aggregationService.getStats()
        fse.outputJsonSync('./result/aggregationResult.json', result, { spaces: 2 })
    }
}

start()
