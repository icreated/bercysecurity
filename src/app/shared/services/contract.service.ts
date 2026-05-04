import {Injectable} from '@angular/core';
import * as jsonContracts from '../../data/contracts.json';

import {Contract} from "../../model/contract";

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  contracts: Contract[] = [];

  loadContracts() {
    this.contracts = (jsonContracts as any).default;
  }

  getContract(id: number): Contract {
    return this.contracts.find(contract => contract.id === id);
  }
}
