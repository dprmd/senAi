import { compareSync } from "bcrypt";

export const comparePassword = (raw, encryptedPassword) => {
  const compareResult = compareSync(raw, encryptedPassword);
  return compareResult;
};

export const filterModels = (models) => {
  let modelsWithOwned = [];
  let owned = [];
  models.forEach((model) => {
    if (!owned.includes(model.owned_by)) {
      owned.push(model.owned_by);
    }
  });
  owned.forEach((owned) => {
    modelsWithOwned.push({
      owned: owned,
      models: models.filter((item) => item.owned_by === owned),
    });
  });
  return modelsWithOwned;
};
