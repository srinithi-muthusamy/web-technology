var http = require('http');
var querystring = require('querystring');

function onRequest(req, res) {
  if (req.method === 'POST') {
    var body = '';
    req.on('data', function(data) {
      body += data;
    });
    req.on('end', function() {
      var params = querystring.parse(body);
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
        <title>employee Details</title>
        <style>
        body
        {
          font-family: Arial, sans-serif;
          background-repeat:no-repeat;
          background-size:1700px;
         
          backdrop-filter: blur(20px);
        }
        
        table {
          font-family: Arial, sans-serif;
          border-collapse: collapse;
          width: 50%;
          margin: 20px auto;
          border: 3px solid black;
        }
        td, th {
          border: 3px solid white;
          text-align: center;
          padding: 8px;
	background-color:#C0C0C0;
        }
          
        h2{
          text-align:center;
          color:black;
          padding:40px;
        }
        
        </style>
        </head>
        <body>
        <h2>Employee Details</h2>
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
    });
  } else {
    res.writeHead(405, {'Content-Type': 'text/plain'});
    res.end('Method not allowed');
  }
}

http.createServer(onRequest).listen(8060);
console.log('Server is running...');