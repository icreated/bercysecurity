import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {ContractService} from "../../shared/services/contract.service";
import {ActivatedRoute} from "@angular/router";
import {Contract} from "../../model/contract";

@Component({
  standalone: false,
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.page.html',
  styleUrls: ['./contract-detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractDetailPage implements OnInit {

  private contractService = inject(ContractService);
  private route = inject(ActivatedRoute);

  contract: Contract;
  segment = "description";

  ngOnInit() {
    let contractId = +this.route.snapshot.paramMap.get('id');
    this.contract = this.contractService.getContract(contractId);
  }

  segmentChanged(event: any) {
    this.segment = event.detail.value;
  }

}
