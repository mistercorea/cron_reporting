/*
1. this program will run every min 
2. it will grab all the jobs and if cron schedule is matched then it will run the reporting
3. it will generate the html output by the query to template
    3.1 if there is custom evel then it will use that custom evel will be executed instead
4. once report is generated custom data can overwrite the data.
5. it will be delivered by delivery type
6. put time stamp to the job it was ran

TODO:
Express UI interface 
1. it will display list
2. second page to perform CRUD


database will have columns of
id , name, active, cron schedule, query, eval, custom data, template html all located in ./template/, devlivery type, delivery to, last time it ran

delivery type are only supports email and sftp/pub key
*/


/*
default database obj 
{ 
  host: '', 
  user: '', 
  password: '', 
  database: '' 
}
*/
database = false;
const Database = require('./src/database');
const Template = require("./src/template");
const Transport = require("./src/transport");
var parser = require("cron-parser");
const Configuration = require("./src/load_config");
var config = new Configuration();

logger = require("./src/logger");

var time_now = new Date();
// just in case seconds passed after this program was called by a cron, truncating seconds and miliseconds + cronjob doesnt care for seconds
time_now = trunc_seconds(time_now);

function trunc_seconds(time){
  time.setSeconds(0);
  time.setMilliseconds(0);
  return time;
}

check_cron_datetime = (cron, time_now) => {
  // convert cronjob to iso string
  scheduled_cron_time = parser
    .parseExpression(cron)
    .prev()
    .getTime();
  return time_now.getTime() == scheduled_cron_time;
};

async function main(){
  // using cron_reporting table
  database = new Database('cron_reporting');

  logger.debug("database config", config.database);
  database.connect(config.database);
  results = await database.getReports();
  logger.info('Reports going to be ran',results);
  
  // Run all the reporting from datbase
  for (i in results) {
    cron = results[i]["cron_schedule"];
    // if cron pattern matches the time execute
    if (check_cron_datetime(cron, time_now)) {
      try {
        queries = JSON.parse(results[i]["queries"]);
      } catch (err) {
        logger.log(0,"Query json parse failed: " + err);
      }
      let promise_query = [];
      // run all the queries from a report
      for (const [title, query] of Object.entries(queries)) {
        logger.info("query will be ran - " + query);
        promise_query.push(database.runCronQuery(query, title));
      }
      // match queries and title
      datas = await Promise.all(promise_query)
      // .then(async datas => {
      let res = {};
      datas.forEach(data => {
        res[data.title] = data.res;
      });
      // generate html output
      template = new Template(res, "./template/" + results[i]["template_html"]);
      html = await template.getOutput()  
      transport = new Transport(results[i]);
      logger.debug("Delivery type - " + transport.type);
      if (transport.type) {
        logger.debug("Delivered to - " + transport.to);
        logger.debug("Report content - " +html);
        // transport.send(html);
      }

      // last time ran time stamp
      ret = await database.setReportedTime(results[i]["id"]);
    }
  }
  database.connection.end();
    
}

main();