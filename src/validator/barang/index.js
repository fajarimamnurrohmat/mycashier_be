const { BarangPayloadSchema } = require("./schema");
const BarangValidator = {
  validateBarangPayload: (payload) => {
    const validationResult = BarangPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new Error(validationResult.error.message);
    }
  },
};
module.exports = BarangValidator;
