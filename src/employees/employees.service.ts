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
  create(employeeData: any) {
    return this.EmployeesRepository.save(employeeData);
  }
  update(emp_code: string, updateData: Partial<Employee>) {
    return this.EmployeesRepository.update(
      { emp_code },
      { emp_exitWork: new Date(), ...updateData },
    );
  }
}
