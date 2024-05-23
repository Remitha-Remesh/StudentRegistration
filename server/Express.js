const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const UserModel = require("./models/User")
const mongoose=require("mongoose")

const app = express()
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST"],
  credentials: true
}))


app.use(bodyParser.json())
dotenv.config()

// const PORT=4000




app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then(hash => {
      UserModel.create({ name, email, password: hash })
        .then(user => res.json("Success"))
        .catch(err => res.json(err))
    }).catch(err => res.json(err))
})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  UserModel.findOne({ email: email })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign({ email: user.email, role: user.role },
              "jwt-secret-key", { expiresIn: '1d' })
            res.cookie('token', token)
            return res.json({ Status: "success", role: user.role })


          } else {
            return res.json("The password is incorrect")
          }

        })

      } else {
        return res.json("no record existed")
      }
    })
})

// const verifyUser = (req, res, next) => {
//     const token = req.cookies.token;
//     if (!token) {
//       return res.status(401).json({ error: "Token is missing" });
//     } else {
//       jwt.verify(token, "jwt-secret-key", (err, decoded) => {
//         if (err) {
//           return res.status(401).json({ error: "Error with token" });
//         } else {
//           if (decoded.role === "admin") {
//             next();
//           } else {
//             return res.status(403).json({ error: "Not admin" });
//           }
//         }
//       });
//     }
//   };

//   app.post("/register", async (req, res) => {
//     try {
//       const { name, email, password } = req.body;
//       const hashedPassword = await bcrypt.hash(password, 10);
//       await User.create({ name, email, password: hashedPassword });
//       res.status(201).json({ message: "User created successfully" });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

//   app.post("/login", async (req, res) => {
//     try {
//       const { email, password } = req.body;
//       const user = await User.findOne({ email: email });
//       if (!user) {
//         return res.status(404).json({ error: "User not found" });
//       }
//       const passwordMatch = await bcrypt.compare(password, user.password);
//       if (passwordMatch) {
//         const token = jwt.sign(
//           { email: user.email, role: user.role },
//           "jwt-secret-key",
//           { expiresIn: "1d" }
//         );
//         res.cookie("token", token, { httpOnly: true });
//         return res.status(200).json({ message: "Login successful", role: user.role });
//       } else {
//         return res.status(401).json({ error: "Incorrect password" });
//       }
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });


const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('connected to the database')
  } catch (error) {
    console.log(error)

  }
}
connect()

//  const PORT=process.env.PORT||4000

app.listen(process.env.PORT, () => {
  console.log(`server running on the port ${process.env.PORT}`)

})