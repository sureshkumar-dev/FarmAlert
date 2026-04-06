import express from "express";
import mongoose from "mongoose"
import cors from "cors";
import auth from "./models/authmodel.js";
import farmer from "./models/farmermodel.js";
import route from "./routes/registerRoute.js";
import authroute from "./routes/authRoute.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import farmermodel from "./models/farmermodel.js";
import sendSMS from "./utils/sendsms.js";
dotenv.config();
const app = express();
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use("/auth", authroute)
app.use("/farm", route)
mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log("db connected") })
    .catch((error) => console.log(error))
app.get("/", (req, res) => {
    res.send("Server  started")
    console.log(req.url);
})
app.get("/api/profile", async (req, res) => {
    const token_jwt = await req.headers.authorization;
    const token = token_jwt.split(" ")[1];

    if (!token) {
        res.json({
            message: "token not found"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const userdata = await auth.findOne({ _id: decoded.id });
        console.log(userdata)
        res.json({
            userdata: userdata
        })
    }
    catch (error) {
        console.log(error)
    }
})
app.get("/farm/all", async (req, res) => {
    console.log("STEP 1: API HIT");

    try {
        const authHeader = req.headers.authorization;
        console.log("STEP 2: HEADER", authHeader);

        if (!authHeader) {
            return res.status(401).json({ message: "No token" });
        }

        const token = authHeader.split(" ")[1];
        console.log("STEP 3: TOKEN", token);

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.TOKEN_SECRET);
            console.log("SECRET:", process.env.TOKEN_SECRET);
            console.log("STEP 4: DECODED", decoded);
        } catch (err) {
            console.log("JWT ERROR:", err);
            return res.status(401).json({ message: "Invalid token" });
        }

        const farmdata = await farmer.find({ userid: decoded.id });
        console.log("STEP 5: DATA", farmdata);


        return res.json({ data: farmdata });

    } catch (error) {
        console.log("FINAL ERROR:", error);
        return res.status(500).json({ message: "Server error" });
    }
});
app.get("/farm/monitor/:id", async (req, res) => {
    try {
        const token = req.headers.authorization;
        const id = req.params.id;
        if (!token) {
            res.json({
                message: "token not found"
            })
        }
        const jwt_token = token.split(" ")[1];
        const decoded = jwt.verify(jwt_token, process.env.TOKEN_SECRET);
        const landdata = await farmer.find({ userid: decoded.id, _id: id })
        console.log(landdata)
        res.json({
            data: landdata
        })

    }
    catch (error) {
        res.json({
            message: error
        })
    }
})
app.post("/sent-alert", async (req, res) => {
    const { phone, message } = req.body;
    console.log("ALERT ROUTE HIT")

    

    console.log("PHONE:", phone)
    console.log("MESSAGE:", message)
    await sendSMS(phone, message);
    res.json({ success: true });


})
app.delete("/farm/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await farmer.findByIdAndDelete({ _id: id });
        res.json({
            message: "data deleted"
        })
    }
    catch (error) {
        console.log(error)
    }

})

app.listen(5000, () => {
    console.log("server started")
})