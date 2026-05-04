import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewCommentPage } from './new-comment.page';

const routes: Routes = [
  {
    path: '',
    component: NewCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewCommentPageRoutingModule {}
