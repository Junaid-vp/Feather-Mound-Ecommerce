const { z } = require("zod");

const loginValidate = z.object({
  email: z.string().email(),
  password: z.string().min(3)
})



module.exports = loginValidate