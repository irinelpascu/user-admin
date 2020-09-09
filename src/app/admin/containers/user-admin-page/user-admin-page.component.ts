import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { UserAdminService } from '../../services/user-admin.service';

@Component({
  selector: 'ef-user-admin-page',
  templateUrl: './user-admin-page.component.html',
  styleUrls: ['./user-admin-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAdminPageComponent implements OnInit {

  addingPermission: boolean;
  addingUserGroup: boolean;
  addingUser: boolean;

  constructor(public userAdminService: UserAdminService) {
  }

  ngOnInit(): void {
  }

}
