
import cron from 'cron'
import https from 'https'

 const Job = new cron.CronJob("*/14 * * * *", function (){
    https.get(process.env.API_URL, (res) => {
        if(res.statusCode === 200) console.log("GET request senr  suceessfully!")
            else console.log("Get request faild", res.statusCode);
    } )
    .on("Error",  (e) => console.errorError ("while sending request", e))
 }
)

export default Job