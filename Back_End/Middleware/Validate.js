const Validate = (Schema) => (req, res, next) => {
  const isDone = Schema.safeParse(req.body);

  if (!isDone.success) {
    return res.status(400).json({
      errors:isDone.error.errors,
    });
  }

  req.body = isDone.data;
  next();
};

module.exports = { Validate };
