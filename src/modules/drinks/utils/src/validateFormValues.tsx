import { ICreateDrinkPayload } from "../../types/drink.interface";

export const validateFormValuesCreateDrink = (formValues: ICreateDrinkPayload) => {
  const hasEmptyValues = Object.entries(formValues).some(([key, value]) => {
    if (key === "extras") {
      return false; // Ignore the 'extras' key
    }
    if (Array.isArray(value)) {
      return value.length === 0;
    }
    return !value;
  });
  
  return !hasEmptyValues;
};