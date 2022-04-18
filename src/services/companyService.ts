import NotFoundError from '../errors/NotFoundError';
import * as companyRepository from '../repositories/companyRepository';

async function findCompany(xApiKey: string): Promise<number> {
    const company = await companyRepository.findByApiKey(xApiKey);

    if (!company) {
        throw new NotFoundError('Company not found!');
    }

    return company.id;
}

export {
    findCompany,
};
