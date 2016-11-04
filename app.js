import express from 'express'; // Igual ao require
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import booksRouter from './routes/books';
import usersRouter from './routes/users';
import authRouter from './routes/auth';
import autorization from './auth';

const app = express();
app.config = config;
app.datasource = datasource(app);

app.set('port', 7000);
app.use(bodyParser.json());

const auth = autorization(app);
app.use(auth.initialize());
app.auth = auth;

booksRouter(app);
usersRouter(app);
authRouter(app);


// Igual exports.module
export default app;
