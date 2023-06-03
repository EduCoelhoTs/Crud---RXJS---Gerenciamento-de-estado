import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LayoutComponent,
    loadChildren: () => import('./modules/lista/lista.module').then(m => m.ListaModule),
  },
  {
    path: 'cadastro',
    component: LayoutComponent,
    loadChildren: () => import('./modules/cadastro/cadastro.module').then(m => m.CadastroModule),
  },
  {
    path: 'editar/:id',
    component: LayoutComponent,
    loadChildren: () => import('./modules/cadastro/cadastro.module').then(m => m.CadastroModule),
  },
  {
    path: '**',
    redirectTo: 'cadastro',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
