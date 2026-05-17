import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Finance } from './pages/finance/finance';
import { Sales } from './pages/sales/sales';
import { Customers } from './pages/customers/customers';
import { Production } from './pages/production/production';
import { Supplychain } from './pages/supplychain/supplychain';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'finance', component: Finance },
  { path: 'sales', component: Sales },
  { path: 'customers', component: Customers },
  { path: 'production', component: Production },
  { path: 'supplychain', component: Supplychain }
];