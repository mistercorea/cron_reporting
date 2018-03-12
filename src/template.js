/*
1. this program will run every min 
2. it will grab all the jobs and if cron schedule is matched then it will run the reporting
3. it will generate the html output by the query to template
    3.1 if there is custom evel then it will use that custom evel will be executed instead
4. once report is generated custom data can overwrite the data.
5. it will be delivered by delivery type
6. put time stamp to the job it was ran

Express UI interface 
1. it will display list
2. second page to perform CRUD


database will have columns of
id , name, active, cron schedule, query, eval, custom data, template html all located in ./template/, devlivery type, delivery to, last time it ran
*/

// Step 1: Create a Vue instance
const Vue = require("vue");
const fs = require("fs");
function Template(data,template_location){
  this.data = data;
  this.template_location = template_location;
}

// Step 2: Create a renderer
const renderer = require("vue-server-renderer").createRenderer();

Template.prototype.getOutput = function(data = false) {
  if (data) {
    this.data = data;
  }
  const app = new Vue({
    data: this.data,
    //   template: `<div>Hello World</div>`
    template: fs.readFileSync(this.template_location, "utf-8")
  });

  return renderer
    .renderToString(app)
    .then(html => {
      return Promise.resolve(html);
    })
    // .then(html => {
    //   // console.log(html);
    //   return html;
    // })
    .catch(err => {
      console.error(err);
    });
};

module.exports = Template;