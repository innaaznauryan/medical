export interface EmployeeSchema {
    id: number;
    fullName: string;
    position: string;
    isHead: boolean;
    departmentId: number;
}

export interface NewEmployeeSchema {
    fullName: string;
    isHead: boolean;
    departmentId: number;
}