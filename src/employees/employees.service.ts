import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employees.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private readonly EmployeesRepository: Repository<Employee>,
  ) {}
  create(employeeData: Employee): Promise<Employee> {
    return this.EmployeesRepository.save(employeeData);
  }

  update(emp_code: string, updateData: Partial<Employee>) {
    return this.EmployeesRepository.update(
      { emp_code },
      { emp_exitWork: new Date().toISOString(), ...updateData },
    );
  }
  findOne(emp_code: string): Promise<Employee> {
    return this.EmployeesRepository.findOne({ where: { emp_code } }).then(
      (employee) => {
        if (!employee) {
          throw new Error(`Employee with emp_code ${emp_code} not found`);
        }
        return employee;
      },
    );
  }
}
