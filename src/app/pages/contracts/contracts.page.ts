import {ChangeDetectionStrategy, Component, OnInit, inject} from '@angular/core';
import {ContractService} from "../../shared/services/contract.service";
import { I18nService } from '../../shared/services/i18n.service';

@Component({
  standalone: false,
  selector: 'app-contracts',
  templateUrl: './contracts.page.html',
  styleUrls: ['./contracts.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContractsPage implements OnInit {

  protected contractService = inject(ContractService);
  protected i18n             = inject(I18nService);

  ngOnInit() {
    this.contractService.loadContracts();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.contractService.loadContracts();
      event.target.complete();
    }, 2000);
  }

}
