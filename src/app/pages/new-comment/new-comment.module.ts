import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCommentPageRoutingModule } from './new-comment-routing.module';

import { NewCommentPage } from './new-comment.page';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        NewCommentPageRoutingModule,
        SharedModule
    ],
    declarations: [NewCommentPage]
})
export class NewCommentPageModule {}
