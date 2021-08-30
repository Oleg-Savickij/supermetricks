# Aggregation service 📊

## Run script

1. Install deps:

   ```sh
   npm install
   ```
2. Run script

    ```sh
    npm start
    ```
3. You can specify email and name for token in console during script run or inside `config/default.json`.
4. Generated file with statistic for last 6 months you can find in `./result/aggregationResult.json`
```json
{
   "monthStats": {
      "[MonthNumber]": {
         "longestPost": "Longest post by character length",
         "avgLength": "Average character length of posts",
         "avgPostsPerUser": "Total posts split by week number"
      },
     ...
   },
   "totalPostsPerWeek": {
      "[WeekNumber]": "Total posts split by week number",
      ...
   }
}

```
## Run unit-tests

Run command:

    npm test
    
