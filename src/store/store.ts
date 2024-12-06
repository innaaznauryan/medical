import { createStore } from 'vuex';
import employeesData from "../data/employeesData.json";
import { EmployeeSchema } from "../types/employee.ts";

interface State {
    employees: EmployeeSchema[];
}
type MutationKeys = 'createEmployee' | 'updateEmployee' | 'deleteEmployee';
type MutationPayloads = {
    createEmployee: EmployeeSchema;
    updateEmployee: EmployeeSchema;
    deleteEmployee: number;
};
type Commit = <K extends MutationKeys>(
    key: K,
    payload: MutationPayloads[K]
) => void;


export const store = createStore({
    state() {
        const storedEmployees = localStorage.getItem('employees');
        return {
            employees: storedEmployees ? JSON.parse(storedEmployees) : employeesData,
        };
    },
    mutations: {
        createEmployee(state: State, newEmployee: EmployeeSchema) {
            state.employees.push(newEmployee);
            localStorage.setItem('employees', JSON.stringify(state.employees));
        },
        updateEmployee(state: State, updatedEmployee: EmployeeSchema) {
            state.employees = state.employees.map((employee) =>
                employee.id === updatedEmployee.id ? updatedEmployee : employee
            );
            localStorage.setItem('employees', JSON.stringify(state.employees));
        },
        deleteEmployee(state: State, employeeId: number) {
            state.employees = state.employees.filter((employee) => employee.id !== employeeId);
            localStorage.setItem('employees', JSON.stringify(state.employees));
        },
    },
    actions: {
        createEmployee({ commit }: { commit: Commit }, newEmployee: EmployeeSchema) {
            commit('createEmployee', newEmployee);
        },
        updateEmployee({ commit }: { commit: Commit }, updatedEmployee: EmployeeSchema) {
            commit('updateEmployee', updatedEmployee);
        },
        deleteEmployee({ commit }: { commit: Commit }, employeeId: number) {
            commit('deleteEmployee', employeeId);
        },
    },
});
