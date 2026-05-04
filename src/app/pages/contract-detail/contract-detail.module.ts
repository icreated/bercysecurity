import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContractDetailPageRoutingModule } from './contract-detail-routing.module';

import { ContractDetailPage } from './contract-detail.page';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ContractDetailPageRoutingModule,
        SharedModule
    ],
    declarations: [ContractDetailPage]
})
export class ContractDetailPageModule {}
