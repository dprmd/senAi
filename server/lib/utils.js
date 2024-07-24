import { compareSync } from "bcrypt";

export const comparePassword = (raw, encryptedPassword) => {
  const compareResult = compareSync(raw, encryptedPassword);
  return compareResult;
};
