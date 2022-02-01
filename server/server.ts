import express from 'express';
import path from 'path';


const app = express();
const PORT = 3000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, './build')));


// unknown root error handling function
app.use((req, res) => res.status(404));

// global error handling function (for middleware functions)
app.use((err, req, res, next) => {
  const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
});


export default app;