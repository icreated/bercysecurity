import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ContractsPageRoutingModule} from './contracts-routing.module';

import {ContractsPage} from './contracts.page';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        ContractsPageRoutingModule
    ],
    declarations: [ContractsPage]
})
export class ContractsPageModule {}
