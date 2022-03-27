import { EmployerCreateDto } from './dto/employer.create.dto';
import { EmployerDto } from './dto/employer.dto';
import { EmployerListDto } from './dto/employer.list.dto';
import { EmployerService } from './employer.service';
export declare class EmployerController {
    private readonly employerService;
    constructor(employerService: EmployerService);
    findAll(): Promise<EmployerListDto>;
    findOne(id: string): Promise<EmployerDto>;
    create(employerCreateDto: EmployerCreateDto): Promise<EmployerDto>;
    update(id: string, employerDto: EmployerDto): Promise<EmployerDto>;
    destory(id: string): Promise<EmployerDto>;
}
