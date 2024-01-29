import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import mongooseConnect from "./lib/mongoose.js";
import { ConnectionCount } from "./models/connectionCount.js";
import cors from "cors"
import dotenv from "dotenv";
import { encrypt } from "./helpers/encryption.js";
import { fetchNgrams } from "./helpers/apiHelpers.js";
import { updateUserModel } from "./helpers/userHelpers.js";

dotenv.config();

const corsOptions = {
    origin: "http://localhost:3000"
}

const PORT = 3001;
const app = express();

app.use(cors(corsOptions))

let connectionCount = 0;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.use( async (req, res, next) => {
  connectionCount += 1;
  console.log("connection count", connectionCount);
  await mongooseConnect();
  ConnectionCount.findOneAndUpdate({}, { $inc: { count: 1 } }, { upsert: true }).exec();
  next();
});

app.post('/express/api', upload.single('image'), async (req, res) => {
  try {
    const encryptedImage = encrypt(fs.readFileSync(req.file.path));
    const fileName = 'encrypted_' + req.file.filename;
    fs.writeFileSync(path.join('uploads/', fileName), encryptedImage);
    fs.unlinkSync(req.file.path);

    const { id, friendId, password } = req.body;
    updateUserModel(id, friendId, password);
    const data = await fetchNgrams(id, friendId);
    console.log(data)
    return res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error uploading and encrypting the image.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
