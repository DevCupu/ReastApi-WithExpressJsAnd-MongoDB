import mongoose from 'mongoose';
const { ValidationError } = mongoose;
const errorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: err.message });
};

export default errorHandler;