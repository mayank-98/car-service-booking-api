require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileupload({
    useTempFiles: true
}));

app.use('/user', require('./routes/userRouter'));
app.use('/api', require('./routes/serviceCenterRouter'));
app.use('/booking', require('./routes/bookingRouter'));
app.use('/review', require('./routes/reviewRouter'));

const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if (err) console.log(err);
    console.log('Connected to MongoDB');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
