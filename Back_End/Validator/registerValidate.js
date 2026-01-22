const { z } = require("zod");


const registerValidate = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(3),
});

module.exports = registerValidate;
