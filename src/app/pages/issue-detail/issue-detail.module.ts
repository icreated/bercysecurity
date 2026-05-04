import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IssueDetailPageRoutingModule } from './issue-detail-routing.module';

import { IssueDetailPage } from './issue-detail.page';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IssueDetailPageRoutingModule,
        SharedModule
    ],
    declarations: [IssueDetailPage]
})
export class IssueDetailPageModule {}
