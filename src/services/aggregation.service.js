class AggregationService {
    constructor() {
        this.stats = {
            monthStats: {},
            totalPostsPerWeek: {}
        }
        this._statsObj = {
            monthStats: {},
            weekStats: {}
        }
    }

    getStats = () => {
        Object.keys(this._statsObj.monthStats).forEach(key => {
            this.stats.monthStats[key] = this._getMonthStats(this._statsObj.monthStats[key])
        })
        this.stats.totalPostsPerWeek = this._statsObj.weekStats

        return this.stats
    }

    clear = () => {
        this.stats = {
            monthStats: {},
            totalPostsPerWeek: {}
        }
        this._statsObj = {
            monthStats: {},
            weekStats: {}
        }
    }

    _getMonthStats = month => {
        let postsPerUsers = Object.values(month.users)
        return {
            longestPost: month.longestPost,
            avgLength: month.avgLength.sum / month.avgLength.count,
            avgPostsPerUser: postsPerUsers.reduce((acc, numberOfPosts) => acc + numberOfPosts, 0) / postsPerUsers.length
        }
    }

    processPost = post => {
        this._updateMonthStats(post);
        this._updateWeekStats(post);
    }

    _updateWeekStats = post => {
        const weekNumber = new Date(post.created_time).getWeekNumber();

        if (this._statsObj.weekStats[weekNumber]) {
            this._statsObj.weekStats[weekNumber] = this._statsObj.weekStats[weekNumber] + 1
        } else {
            this._statsObj.weekStats[weekNumber] = 1
        }
    }

    _updateMonthStats = ({ created_time, message, from_id }) => {
        const monthNumber = new Date(created_time).getMonth();

        if (this._statsObj.monthStats[monthNumber]) {
            let month = this._statsObj.monthStats[monthNumber]

            this._updateLongest(message, month)
            this._updateAvgLength(message, month)
            this._updatePostsByUser(from_id, month)
        } else {
            this._statsObj.monthStats[monthNumber] = {
                longestPost: message.length,
                avgLength: {
                    count: 1,
                    sum: message.length
                },
                users: {
                    [from_id]: 1
                }
            }
        }
    }

    _updateLongest = (message, month) => {
        month.longestPost = Math.max(month.longestPost, message.length)
    }

    _updateAvgLength = (message, month) => {
        month.avgLength.count = month.avgLength.count + 1
        month.avgLength.sum = month.avgLength.sum + message.length
    }

    _updatePostsByUser = (from_id, month) => {
        if (month.users[from_id]) {
            month.users[from_id] = month.users[from_id] + 1
        } else {
            month.users[from_id] = 1
        }
    }
}

module.exports = AggregationService
