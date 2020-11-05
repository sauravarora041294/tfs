import { AuthedRequest as axios } from "./axiosutil";
import * as DataTypes from "data/types";
import * as constants from "./constants";
interface EmployeeExists {
  exists: boolean;
}

class Employee {
  static create = async (
    employee: DataTypes.Employee,
  ): Promise<DataTypes.Employee> => {
    const url = constants.API_URL + "employees";
    const response = await axios.post(
      url,
      {
        email: employee.email,
        firstName: employee.firstName,
        lastName: employee.lastName,
        userId: employee.userId,
      },
      { timeout: constants.TIMEOUT },
    );

    return response.data.result;
  };
}

export { Employee };
