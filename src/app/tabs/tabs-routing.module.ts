import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'issues',
        loadChildren: () => import('../pages/issues/issues.module').then(m => m.IssuesPageModule)
      },
      {
        path: 'issue-detail/:id',
        loadChildren: () => import('../pages/issue-detail/issue-detail.module').then( m => m.IssueDetailPageModule)
      },
      {
        path: 'contracts',
        loadChildren: () => import('../pages/contracts/contracts.module').then(m => m.ContractsPageModule)
      },
      {
        path: 'contract-detail/:id',
        loadChildren: () => import('../pages/contract-detail/contract-detail.module').then( m => m.ContractDetailPageModule)
      },
      {
        path: 'events',
        loadChildren: () => import('../pages/events/events.module').then(m => m.EventsPageModule)
      },
      {
        path: 'assets',
        loadChildren: () => import('../pages/assets/assets.module').then(m => m.AssetsPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../pages/settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'help',
        loadChildren: () => import('../pages/help/help.module').then(m => m.HelpPageModule)
      },
      {
        path: 'new-comment/:id',
        loadChildren: () => import('../pages/new-comment/new-comment.module').then( m => m.NewCommentPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
