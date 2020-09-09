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

  private permissions: Permission[] = [];
  private userGroups: UserGroup[] = [];
  private users: User[] = [];
  private configOptions: { [key: string]: ConfigOption[] };

  constructor() {
    this.permissions = [];
    this.userGroups = [];
    this.users = [];
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

  public addPermission(permission: Permission) {
    if (!this.permissions) {
      this.permissions = [];
    }
    this.permissions.push(permission);
  }

  public addUserGroup(userGroup: UserGroup) {
    if (!this.userGroups) {
      this.userGroups = [];
    }
    this.userGroups.push(userGroup);
  }

  public addUser(user: User) {
    if (!this.users) {
      this.users = [];
    }
    this.users.push(user);
  }

  public updatePermission(permission: Permission) {
    const foundPermission = this.permissions.find(permissionItem => permissionItem.id === permission.id);
  }

  public updateUserGroup(userGroup: UserGroup) {
    const foundUserGroup = this.userGroups.find(userGroupItem => userGroupItem.id === userGroup.id);
  }

  public updateUser(user: User) {
    const foundUser = this.users.find(userItem => userItem.id === user.id);
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
}
