const EMPLOYEE_API_BASE_URL: string = "/api/employees";

type Employee = {
    id: number;
    name: string;
    position: string;
    facility: object;
}

class EmployeeService {

    resetCourses(employeeId: number): Promise<Response> {
        return fetch(EMPLOYEE_API_BASE_URL + "/" + employeeId + "/reset-courses");
    }

    getEmployees(): Promise<Response> {
        return fetch(EMPLOYEE_API_BASE_URL);
    }

    getEmployeesForFacility(name: string): Promise<Response> {
        return fetch(EMPLOYEE_API_BASE_URL + "/for-" + name);
    }

    createEmployee(employee: Employee): Promise<Response> {
        return fetch(EMPLOYEE_API_BASE_URL, {
            method: 'POST',
            body: JSON.stringify(employee),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        });
    }

    updateEmployee(employee: Employee): Promise<Response> {
        return fetch(EMPLOYEE_API_BASE_URL + "/" + employee.id, {
            method: 'PUT',
            body: JSON.stringify(employee),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        });
    }

    getEmployeeById(employeeId: number): Promise<Response> {
        return fetch(EMPLOYEE_API_BASE_URL + "/" + employeeId);
    }

    getEmployeeHoursSum(employeeId: number): Promise<Response> {
        return fetch(EMPLOYEE_API_BASE_URL + "/hours-sum/" + employeeId);
    }

    deleteEmployee(employeeId: number): Promise<Response> {
        return fetch(EMPLOYEE_API_BASE_URL + "/" + employeeId, {
            method: 'DELETE',
        });
    }
}

export default new EmployeeService();