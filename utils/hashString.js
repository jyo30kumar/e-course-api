import bcrypt from "bcrypt";

const saltRounds = 10;
const hashString = (plainText) => {
  try {
    const hashedString = bcrypt.hash(plainText, saltRounds)
    return hashedString;
  } catch (error) {
    console.error(error.stack);
    throw new Error(error);
  }
};

export { hashString };
