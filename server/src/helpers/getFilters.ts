import { GENDERS, SEASONS } from "../types/types.js";

const genderOptions = GENDERS;
const seasonOptions = SEASONS;

export const genders = genderOptions.map((item, i) => {
  return { id: i, name: item };
});
export const seasons = seasonOptions.map((item, i) => {
  return { id: i, name: item };
});
