const express = require("express");
var cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// const corsOptions = {
//   origin: "https://container-5gk9.onrender.com",
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

app.use(function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = [
    "http://localhost:3000",
    "https://express-hello-world-wk8x.onrender.com",
    "https://container-5gk9.onrender.com",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});

let currentUser = {
  name: "John Doe",
  age: 55,
  hairColor: "brown",
  hobbies: ["swimming", "bicycling", "video games"],
};

let users = [
  {
    name: "John Doe",
    age: 54,
    hairColor: "brown",
    hobbies: ["swimming", "bicycling", "video games"],
  },
  {
    name: "Brenda Smith",
    age: 33,
    hairColor: "black",
    hobbies: ["golf", "mathematics"],
  },
  {
    name: "Jane Garcia",
    age: 27,
    hairColor: "blonde",
    hobbies: ["biology", "medicine", "gymnastics"],
  },
];

const products = [
  {
    name: "Flat-Screen TV",
    price: "$300",
    description: "Huge LCD screen, a great deal",
    rating: 4.5,
  },
  {
    name: "Basketball",
    price: "$10",
    description: "Just like the pros use",
    rating: 3.8,
  },
  {
    name: "Running Shoes",
    price: "$120",
    description: "State-of-the-art technology for optimum running",
    rating: 4.2,
  },
];

app.get("/current-user", (req, res) => {
  res.json(currentUser);
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;

  res.json(users.find((user) => user.id === id));
});

app.post("/users/:id", (req, res) => {
  const { id } = req.params;
  const { user: updatedUser } = req.body;

  users = users.map((user) => (user.id === id ? updatedUser : user));

  res.json(users.find((user) => user.id === id));
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;

  res.json(products.find((product) => product.id === id));
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
