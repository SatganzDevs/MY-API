import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path"
import ejs from "ejs"
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



import apiRoutes from "./routes/api.js";

const app = express();

// settings
app.set("port", process.env.PORT || 4000);

// middlewares
app.enable('trust proxy');
app.set("json spaces",2)
app.use(express.static(path.join(__dirname, 'views')));
app.use(cors())
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// fetching web codesanbox for make my bots online
setInterval(() => {
  axios.get("https://hn43zx-8080.csb.app/").then((res) => {
    console.log(res.data);
  });
}, 10_000);

// routes
app.get("/", (req, res) => {
  res.render('index')
});
app.get("/downloader", (req, res) => {
  res.render('dl')
});
app.get("/random-image", (req, res) => {
  res.render('rimage')
});
app.get("/random-anime", (req, res) => {
  res.render('ranime')
});
app.use("/api", apiRoutes)

// starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
