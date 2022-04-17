import { CardValuesUpdate } from "../interfaces/cardInterface";

export function mapObjectToUpdateQuery({ object, offset = 1 }: CardValuesUpdate) {
  const objectColumns = Object.keys(object)
    .map((key, index) => `"${key}"=$${index + offset}`)
    .join(",");
  const objectValues = Object.values(object);
  console.log({ objectColumns, objectValues });
  
  return { objectColumns, objectValues };
}
