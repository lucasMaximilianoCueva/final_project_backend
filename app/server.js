require("dotenv").config({ path: "./config.env" });
const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const passport = require("passport");
const { chat } = require("./config/chat.js");
const path = require("path");
const passportLocal = require("./middlewares/passportLocal.js");
const logger = require("./helpers/pino.js");
const infoRoutes = require("./routes/infoRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const connectDB = require("./config/db");

connectDB();

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(cookieParser("secret"));

app.use(
  session({
    store: mongoStore.create({
      mongoUrl:
        "mongodb+srv://reactExpressDB:42707519@cluster0.7ezer.mongodb.net/ecommerce?retryWrites=true&w=majority",
      ttl: 60,
    }),
    secret: "123-456-789",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 600 },
    rolling: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
passportLocal(passport);

app.use("/api", infoRoutes);
app.use("/api/products", productRoutes);
app.use("/user", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Api running");
  });
}

const PORT = process.env.PORT;

const server = httpServer.listen(PORT, (err) => {
  if (!err) logger.info(`Servidor express escuchando en el puerto ${PORT}`);
});

server.on("error", (error) => logger.error("Error en servidor: %s", error));

/* -------------------- Web Sockets ---------------------- */

io.on("connection", async (socket) => {
  socket.on("disconnect", () => {
    logger.info("user disconnected (chat)");
  });
  logger.info("user connected! (chat)");

  await chat.list().then((list) => {
    socket.emit("messages", list);
  });

  socket.on("new-message", async (data) => {
    chat.insert(data).then(() => {});
    await chat.list().then((list) => {
      io.emit("messages", list);
    });
  });
});
