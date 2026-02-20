export function notFound(req, res) {
  res.status(404).json({
    message: `Not Found - ${req.originalUrl}`
  });
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || 'Server error'
  });
}

