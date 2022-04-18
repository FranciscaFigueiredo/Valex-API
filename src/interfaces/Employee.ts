export interface Employee {
    id: number;
    fullName: string;
    cpf: string;
    email: string;
    companyId: number;
}

export type EmployeeName = Omit<Employee, 'id, cpf, email, companyId'>;
