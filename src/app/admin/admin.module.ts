import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAdminPageComponent } from './containers/user-admin-page/user-admin-page.component';
import { AdminPageComponent } from './containers/admin-page/admin-page.component';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ListItemComponent } from './components/list-item/list-item.component';
import { MatSelectModule } from '@angular/material/select';
import { NewItemComponent } from './components/new-item/new-item.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserAdminPageComponent,
    AdminPageComponent,
    ListItemComponent,
    NewItemComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule {
}
