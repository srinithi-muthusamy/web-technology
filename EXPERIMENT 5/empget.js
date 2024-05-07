var http = require('http');
var url = require('url');
var querystring = require('querystring');

function onRequest(req, res) {
  var path = url.parse(req.url).pathname;
  console.log('Request for ' + path + ' received');
  
  var query = url.parse(req.url).query;
  console.log(query);
  var params = querystring.parse(query);
  var username = params["username"];
  var id = params["id"];
  var branch = params["branch"];
  var mobileNo = params["phno"];
  var gender = params["gender"];
  var branchadd = params["branchadd"];

  // HTML content for displaying the message in a table
  var htmlResponse = `
    <html>
    <head>
    <title >Employee Details</title>
    <style>
	      table {
          font-family: Arial, sans-serif;
          border-collapse: collapse;
          width: 50%;
          margin: 20px auto;
          ;
        }

      td, th {
       border: 3px solid white;
        text-align: center;
        padding: 8px;
      }
      td {
        background-color:#D8BFD8;
      }
	th{
        background-color: #D8BFD8;
      }

    </style>
    </head>
    <body>
    <h2 style="text-align:center">Employee Details</h2>
    <table>
      <tr>
        <th>Label</th>
        <th>Details</th>
      </tr>
      <tr>
        <td>Emp name</td>
        <td>${username}</td>
      </tr>
      <tr>
        <td>Emp ID</td>
        <td>${id}</td>
      </tr>
      <tr>
        <td>Branch</td>
        <td>${branch}</td>
      </tr>
      <tr>
        <td>Mobile No</td>
        <td>${mobileNo}</td>
      </tr>
      <tr>
        <td>Gender</td>
        <td>${gender}</td>
      </tr>
      <tr>
        <td>Address</td>
        <td>${branchadd}</td>
      </tr>
    </table>
    </body>
    </html>
  `;
  
  // Write the HTML response
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(htmlResponse);
  res.end();
}

http.createServer(onRequest).listen(8000);
console.log('Server is running...');