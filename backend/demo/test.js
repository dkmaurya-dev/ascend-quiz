const express = require('express')
const app = express()
const port = 3000

app.use(express.json());


const data=[
  {
    "id": 1,
    "name": "Deepak Maurya",
    "email": "deepak@example.com",
    "age": 25,
    "isActive": true
  },
  {
    "id": 2,
    "name": "Rohit Sharma",
    "email": "rohit@example.com",
    "age": 30,
    "isActive": false
  },
  {
    "id": 3,
    "name": "Priya Singh",
    "email": "priya@example.com",
    "age": 27,
    "isActive": true
  }
]

app.get("/", (req, res) => {
  res.send('Hello World!')
})

app.get("/api/users", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: data
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})