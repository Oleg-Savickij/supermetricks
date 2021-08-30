const AggregationService = require('./aggregation.service');
require('../helpers/polyfills')

describe('aggregationService', () => {
    test('aggregationService.processPost successfully update stats', async () => {
        const post = {
            from_id: '1',
            message: 'test message',
            created_time: '2021-01-01'
        }
        const post1 = {
            from_id: '1',
            message: 'test message1',
            created_time: '2021-01-01'
        }
        const post2 = {
            from_id: '2',
            message: 'test message',
            created_time: '2021-02-01'
        }
        const aggregationService = new AggregationService()
        aggregationService.processPost(post)
        aggregationService.processPost(post1)
        aggregationService.processPost(post2)

        expect(aggregationService._statsObj).toStrictEqual({
            monthStats: {
                0: {
                    avgLength: {
                        count: 2,
                        sum: 25
                    },
                    longestPost: 13,
                    users: {
                        1: 2
                    }
                },
                1: {
                    avgLength: {
                        count: 1,
                        sum: 12
                    },
                    longestPost: 12,
                    users: {
                        2: 1
                    }
                }
            },
            weekStats: {
                5: 1,
                53: 2
            }
        })
    })

    test('aggregationService.getStats successfully generate stats', () => {
        const aggregationService = new AggregationService();
        aggregationService._statsObj = {
            monthStats: {
                0: {
                    avgLength: {
                        count: 2,
                        sum: 25
                    },
                    longestPost: 13,
                    users: {
                        1: 2
                    }
                },
                1: {
                    avgLength: {
                        count: 1,
                        sum: 12
                    },
                    longestPost: 12,
                    users: {
                        2: 1
                    }
                }
            },
            weekStats: {
                5: 1,
                53: 2
            }
        };

        expect(aggregationService.getStats()).toStrictEqual({
            monthStats: {
                0: {
                    avgLength: 12.5,
                    avgPostsPerUser: 2,
                    longestPost: 13,
                },
                1: {
                    avgLength: 12,
                    avgPostsPerUser: 1,
                    longestPost: 12,
                },
            },
            totalPostsPerWeek: {
                5: 1,
                53: 2,
            },
        })
    })

    test('aggregationService.clear successfully clean aggregationService', () => {
        const aggregationService = new AggregationService();
        aggregationService.stats = 'test';
        aggregationService._statsObj = 'test';
        aggregationService.clear();

        expect(aggregationService.stats).toStrictEqual({
            monthStats: {},
            totalPostsPerWeek: {}
        });
        expect(aggregationService._statsObj).toStrictEqual({
            monthStats: {},
            weekStats: {}
        });
    })
})
