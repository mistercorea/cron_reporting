<div id="----"></div>

# Table
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
- [Table](#table)
    - [installation](#installation)
    - [Database content format](#database-content-format)
        - [queries example](#queries-example)
        - [delivery example](#delivery-example)


## installation
 - node (>8.10.0)
 - npm
 - npm instsall && npm update
 - add jobs to cron for every min 
    - `* * * * * ./node index.js`
<span style="float:right">[↥ back to top](#----)</span>

## Database content format
Column Name|Description
---|---
Name | This will go on the email subject line and can be used up to 25 char (can be increased from databse if it is necessary)
Active | Only value with 1 will be ran from this program
cron_schedule|Cron format of schedule, program will execute the report if it matches with current time(it doesn't check for seconds)
[queries](#queries-example)| JSON format {title:query} 
eval| TODO - it should able to inject code to do some custom action
template_html| file path/name under ./template 
delivery_type| string (email) TODO - sftp ftp and maybe websocket
[delivery_to](#delivery-example)| string destination location
last_time_ran | it displays when it was ran last time

### queries example
```
{"query_title" :"SELECT column_name from table_name"}
------------------
that will be interpret on the vue template to access
{{ query_title[row][column_name]}}
-------------------
<table>
    <th v-for="(v,k) in query_title[0]">
        <td>{{k}}</td>
    </th>
    <tr v-for="c in query_title">
        <td>{{ c["column_name1"] }}</td>
        <td>{{ c["column_name2"] }}</td>
        ...
    </tr>
</table>

```

randers to
| query_title1  | query_title2  |
|---|---|
|  c["column_name1"] | c["column_name2"]   |


### delivery example
| type | format |
|---|---|
| email | a@a.com, b@b.com  |
|sftp| |
| websocket| |


