import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";

/*  Configurations */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* File Storage configurations */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb( null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}-${Date.now()}`);
    }
});
const upload = multer({ storage });

// Routes with files
app.post("/auth/register", upload.single('picture'), verifyToken, register);

//  Routes
app.use("/auth", authRoutes);

/*  Mongoose setup */
const port = process.env.PORT || 6001;
mongoose.connect(process.env.MONGODB_URL).then(() => {
    app.listen(port, () => console.log(`Server running on PORT:- ${port}`));
}).catch((error) => console.log(`${error} : Did not connect.`));
