import express from "express";
import path from "path";
import multer from "multer";
const server = express();
// const upload = multer({ dest: "uploads/" });
const PORT = 8080;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

server.set("view engine", "ejs");
server.set("views", path.resolve("./views"));

server.use(express.urlencoded());

server.get("/", (req, res) => {
  return res.render("homepage");
});

server.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.redirect("/");
});

server.listen(PORT, () => {
  console.log(`Server is listening at PORT ${PORT}`);
});
