// import 
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const httpStatus = require('http-status');
const passport = require('passport');

// config
const { env } = require('./config/settings');
const jwtStrategy = require('./config/passport');
// middleware
const morgan = require('./middlewares/morgan');
const { errorConverter, errorException } = require('./middlewares/errorHandler');
// const authRateLimiter = require('./middlewares/authRateLimiter');

// utils
const AppError = require('./utils/AppError');

// routes
const apiRouter = require('./routers');

// init express App
const app = express();
const URL = `/api/v1`

// init/assign middleware
// middlewares
// enable cors
app.use(cors());
app.options('*', cors());
if (env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// jwt | passport
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// list endpoints
// app.get('/', function (req, res) {
//     res.json({
//         host: host,
//         port: port
//     })
// })

// init routes
app.use('/api/v1', apiRouter);

// app.use('/product', product_router)
// app.use('/admin', admin_router)
// app.use('/customer/order', order_router)
// app.use(auth_router)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use((req, res, next) => {
    next(new AppError(httpStatus.NOT_FOUND, 'Not found'));
  });
  
  // handle error
  app.use(errorException);
  // boolean needed, convert error to AppError,
  app.use(errorConverter);
  

// contoh init handler yang menggunakan class
const port = process.env.PORT || 8001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});