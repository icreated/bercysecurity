export * from './contracts.service';
import { ContractsService } from './contracts.service';
export * from './issues.service';
import { IssuesService } from './issues.service';
export * from './user.service';
import { UserService } from './user.service';
export const APIS = [ContractsService, IssuesService, UserService];
