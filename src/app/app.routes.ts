import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { ProdutoDetalhe } from './pages/produto-detalhe/produto-detalhe';
import { Login } from './pages/login/login';
import { Perfil } from './pages/perfil/perfil';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'produto/:id', component: ProdutoDetalhe },
  { path: 'login', component: Login },
  { path: 'perfil', component: Perfil },
  { path: '**', redirectTo: '' }
];
