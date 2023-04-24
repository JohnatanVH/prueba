function logErrors(err,req,res,next){ //obligatorialmente debe tener los 4 parametros
  console.error(err);
  next(err);
}

function errorHandler(err,req,res,next){ // para que detecte que es un middleware de error
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err,req,res,next){ //){
  if(err.isBoom){
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }else{
    next(err);

  }
}

module.exports = {logErrors, errorHandler, boomErrorHandler}
