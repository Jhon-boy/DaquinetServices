import express from 'express'
import router from './routes/routes.js';
import swaggerDocs from './routes/swagger.js';

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


swaggerDocs(app, 8081);

app.use(router)

export default app;
