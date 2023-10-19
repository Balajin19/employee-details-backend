const express = require( "express" );
const cors=require("cors")
const dotenv = require( "dotenv" );
const routes = require( "./routes/routes" );
const connectdb=require("./config/connectdb")
const app = express();
app.use( express.json() );
app.use(cors());
app.options( "*", cors() );
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.options("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.sendStatus(204);
} );

const port = process.env.PORT || 3000;
dotenv.config();
connectdb();
app.use(express.urlencoded({ extended: false }));
app.set( "view engine", "jade" );
app.use( "/", routes );
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
          message: error.message,
        status:error.status
    },
  });
} );

app.listen(port);
