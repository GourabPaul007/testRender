// var http = require("http");

// const requestListener = function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(`
//     	<html lang="en">
// 		<head>
// 			<title>My Website</title>
// 		</head>
// 		<body>
// 		    <h1 style="color:#AA0000;">Node is my head!</h1>
// 		</body>
// 		</html>
// 	`)
//     res.end();
// };

// const port = 8080;
// const host = 'localhost';
// var s = http.createServer(requestListener)

// s.listen(port, host, () => {
//     console.log(`Server is running on http://${host}:${port}`);
// });

const express = require("express");
const cors = require("cors");
let students = require("./students.json").students;

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
const host = process.env.HOST || "localhost";

app.get("/", (req, res) => {
  console.log(students);
  res.send(students);
});

app.post("/addStudent", function (req, res) {
  const roll = req.body.roll;
  const name = req.body.name;
  const address = req.body.address;
  console.log(req);
  students.push({ roll, name, address });
  res.send(students);
  // res.status(404, "Student Not Found");
});

app.post("/updateStudent", function (req, res) {
  const roll = req.roll;
  for (let i = 0; i < students.length; i++) {
    const element = students[i];
    if (element.roll === roll) {
      element.roll = req.roll;
      element.name = req.name;
      element.address = req.address;
    }
  }
  res.status(200, "Updated");
});

app.post("/deleteStudent", function (req, res) {
  const roll = req.body.roll;
  console.log(req);
  students = students.filter((element) => element.roll != roll);
  res.send(students);
  // res.status(404, "Student Not Found");
});

app.listen(port, host, () => {
  console.log("Server listening on port", port);
});
