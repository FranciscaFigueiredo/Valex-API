import { CardValuesUpdate } from '../interfaces/Card';

export function mapObjectToUpdateQuery({ object, offset = 1 }: CardValuesUpdate) {
    const objectColumns = Object.keys(object)
        .map((key, index) => `"${key}"=$${index + offset}`)
        .join(',');
    const objectValues = Object.values(object);

    return { objectColumns, objectValues };
}
