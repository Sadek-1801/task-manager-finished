const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 9000;
const app = express();
require("dotenv").config();

const corsOptions = {
  origin: ["http://localhost:5174", "http://localhost:5173"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// verify token
const verifyToken = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "unauthorized access" });
    }
    req.user = decoded;
    next();
  });
};
// verify admin


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qv5d3vd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const userCollection = client.db("taskManager").collection("users");
    const tasksCollection = client.db("taskManager").collection("tasks");

    const verifyAdmin = async (req, res, next) => {
      const user = req.user;
      const query = { email: user?.email };
      const result = await userCollection.findOne(query);
      if (!result || result?.role !== "admin")
        return res.status(401).send({ message: "unauthorized access!!" });
    
      next();
    };

    // auth related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10h",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({ success: true });
    });
    // Logout
    app.get("/logout", async (req, res) => {
      try {
        res
          .clearCookie("token", {
            maxAge: 0,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
          })
          .send({ success: true });
        console.log("Logout successful");
      } catch (err) {
        res.status(500).send(err);
      }
    });

    app.post("/add-task", verifyToken, verifyAdmin, async (req, res) => {
      try {
        const task = req.body;
        const result = await tasksCollection.insertOne(task);
        res.status(201).send(result);
      } catch (error) {
        console.error("Error adding task:", error);
        res
          .status(500)
          .send({ error: "An error occurred while adding the task." });
      }
    });
    // fetch all tasks
    app.get("/all-tasks", verifyToken, verifyAdmin, async (req, res) => {
      try {
        const result = await tasksCollection.find().toArray();
        res.status(201).send(result);
      } catch (error) {
        console.error("Error finding task:", error);
        res
          .status(500)
          .send({ error: "An error occurred while searching for all task." });
      }
    });
    app.delete("/delete/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      try {
        const result = await tasksCollection.deleteOne(query);
        res.status(201).send(result);
      } catch (error) {
        console.error("Error deleting task:", error);
        res
          .status(500)
          .send({ error: "An error occurred while deleting task." });
      }
    });

    // update task
    app.patch("/update-task/:id", verifyToken, async (req, res) => {
      try {
        const id = req.params.id;
        const body = req.body;
        const query = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {
          $set: {
            ...body,
          },
        };
        const result = await tasksCollection.updateOne(
          query,
          updateDoc,
          options
        );
        res.status(201).send(result);
      } catch (error) {
        console.error("Error finding task:", error);
        res
          .status(500)
          .send({ error: "An error occurred while searching for all task." });
      }
    });

    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });


    app.get("/user/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      try {
        const result = await userCollection.findOne(query);
        res.status(201).send(result);
      } catch (error) {
        console.error("Error finding user by Email", error);
        res
          .status(500)
          .send({ error: "An error occurred while searching for Email." });
      }
    });
    app.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      try {
        const result = await userCollection.deleteOne(query);
        res.status(201).send(result);
      } catch (error) {
        console.error("Error deleting user by Email", error);
        res
          .status(500)
          .send({ error: "An error occurred while deleting an user." });
      }
    });
    // save user api
    app.put("/user",  async (req, res) => {
      const user = req.body;
      const query = { email: user?.email };
      const isExist = await userCollection.findOne(query);
      if (isExist) {
        return res.send(isExist);
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // user tasks
    app.get("/my-tasks/:email", verifyToken, async (req, res) => {
      const userEmail = req.params.email;
      try {
        const tasks = await tasksCollection
          .find({ assignedTo: userEmail })
          .toArray();
        res.send(tasks);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });
    // update status
    app.patch("/update-task-status/:id", verifyToken, async (req, res) => {
      const taskId = req.params.id;
      const { status } = req.body;
      try {
        const result = await tasksCollection.updateOne(
          { _id: new ObjectId(taskId) },
          { $set: { status } }
        );
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("task manager server running");
});
app.listen(port, () => {
  console.log(`task manager Server is running on ${port}`);
});
