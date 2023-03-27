import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import authRouter from './routes/auth.js'
import groceriesRouter from './routes/groceries.js';
import marketsRouter from './routes/markets.js'


const app = express();
mongoose.connect('mongodb://localhost:27017/expressjs_tut')
    .then(() => console.log('Connected to db'))
    .catch((err) => console.log(err))

app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'dasdSAqkmwiMKSDMqs$%!mkwd',
    resave: false,
    saveUninitialized: false
}));

app.use('/auth', authRouter);
app.use('/groceries', groceriesRouter);
app.use('/markets', marketsRouter);


app.listen(3000, () => {
    console.log('Starting port 3000')
})

app.get('/', (req, res) => {
    res.send('Gugu gaga');
})



