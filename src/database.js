var mysql = require("mysql");
var _ = require("lodash");

logger = require("./logger");
logger.lable = "database";


Database.prototype.getReports = function(){
  let that = this;
  return new Promise(function(res, err) {
    // that.connection.connect() // implied
    that.connection.query(
      "SELECT * from " + that.table_name + " where active = 1",
      function(error, results, fields) {
        if (error) {
          err(error);
        } else {
          res(results);
        }
        // that.connection.end();
      }
    );
  });
}

Database.prototype.setReportedTime = function(id) {
  let that = this;
  let sql = mysql.format("UPDATE " + that.table_name + " set last_time_ran = ? where id = ?",[mysql.raw('CURRENT_TIMESTAMP()'),id]);
  // console.log(sql);
  return that.runCronQuery(sql);
  // return sql;

};

/**
 * 
 * @param string query
 * @returns Promise res - {res:results,keys: fields} 
 *          Promise err - error
 */
Database.prototype.runCronQuery = function(query, title = "") {
  let that = this;
  return new Promise(function(res, err) {
    that.connection.query(query, function(error, results, fields) {
      if (error) {
        // console.log(error);
        err(error);
      } else {
        // console.log(results);
        res({"res":results,"keys":fields,"title":title});
      }
      // console.log(that.connection);
      // that.connection.end();
    });
  });
};

function Database(table_name){
    this.table_name = table_name;
    this.connection = null;
}


Database.prototype.connect = function(database){
    
    this.connection = mysql.createConnection(database);

}
module.exports = Database;