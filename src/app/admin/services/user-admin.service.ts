import { Injectable } from '@angular/core';
import {
  ConfigOption,
  Permission,
  User,
  UserGroup
} from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class UserAdminService {

  private permissions: Permission[];
  private userGroups: UserGroup[];
  private users: User[];
  private configOptions: { [key: string]: ConfigOption[] };

  constructor() {
    this.permissions = [];
    this.userGroups = [];
    this.users = [];
    this.generateConfigOptions();
  }

  public addPermission(permission: Permission) {
    this.permissions.push(permission);
    this.generateConfigOptions();
  }

  public addUserGroup(userGroup: UserGroup) {
    this.userGroups.push(userGroup);
    this.generateConfigOptions();
  }

  public addUser(user: User) {
    this.users.push(user);
    this.generateConfigOptions();
  }

  public updatePermission(permission: Permission) {
    this.permissions = this.permissions.map(permissionItem => permissionItem.id === permission.id ? permission : permissionItem);
    this.generateConfigOptions();
  }

  public updateUserGroup(userGroup: UserGroup) {
    this.userGroups = this.userGroups.map(userGroupItem => userGroupItem.id === userGroup.id ? userGroup : userGroupItem);
    this.generateConfigOptions();
  }

  public updateUser(user: User) {
    this.users = this.users.map(userItem => userItem.id === user.id ? user : userItem);
    this.generateConfigOptions();
  }

  public getPermissions(): Permission[] {
    return this.permissions;
  }

  public getUserGroups(): UserGroup[] {
    return this.userGroups;
  }

  public getUsers(): User[] {
    return this.users;
  }

  public getOptions(type: 'permission' | 'userGroup' | 'user'): ConfigOption[] {
    return this.configOptions[type];
  }

  private generateConfigOptions() {
    this.configOptions = {
      permission: [],
      userGroup: [
        {
          id: 'permissions',
          options: this.permissions
        }
      ],
      user: [
        {
          id: 'userGroups',
          options: this.userGroups
        },
        {
          id: 'permissions',
          options: this.permissions
        }
      ],
    };
  }
}
