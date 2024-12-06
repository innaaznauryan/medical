export enum Department {
    cardiology = 1,
    surgical = 2,
}

export const DepartmentLabel: Record<number, string> = {
    [Department.cardiology]: 'cardiology',
    [Department.surgical]: 'surgical',
};