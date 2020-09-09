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

  private permissions: {
    [id: string]: Permission
  };
  private userGroups: {
    [id: string]: UserGroup
  };
  private users: {
    [id: string]: User
  };
  private configOptions: { [key: string]: ConfigOption[] };

  constructor() {
    this.permissions = {};
    this.userGroups = {};
    this.users = {};
    this.generateConfigOptions();
  }

  public upsertPermission(permission: Permission) {
    this.permissions[permission.id] = {
      ...this.permissions[permission.id],
      ...permission
    };
    this.generateConfigOptions();
  }

  public upsertUserGroup(userGroup: UserGroup) {
    this.userGroups[userGroup.id] = {
      ...this.userGroups[userGroup.id],
      ...userGroup
    };
    this.generateConfigOptions();
  }

  public upsertUser(user: User) {
    this.users[user.id] = {
      ...this.users[user.id],
      ...user
    };
    this.generateConfigOptions();
  }

  public getPermissions(): Permission[] {
    return Object.keys(this.permissions).map(key => this.permissions[key]);
  }

  public getUserGroups(): UserGroup[] {
    return Object.keys(this.userGroups).map(key => this.userGroups[key]);
  }

  public getUsers(): User[] {
    return Object.keys(this.users).map(key => this.users[key]);
  }

  public getOptions(type: 'permission' | 'userGroup' | 'user'): ConfigOption[] {
    return this.configOptions[type];
  }

  public getUserPermissions(userId: string): Permission[] {
    const user: User = this.users[userId];
    if (user) {
      const userGroups: UserGroup[] = (user.userGroups || []).map(groupId => this.userGroups[groupId]);
      let permissionIds: string[] = [...(user.permissions || []), ...userGroups.reduce((acc, crt) => [
        ...acc,
        ...crt.permissions,
      ], [])];
      permissionIds = Array.from(new Set(permissionIds));
      return permissionIds.map(id => this.permissions[id]);
    }
    return null;
  }

  public addMockData() {
    this.permissions = {
      p1: {
        id: 'p1',
        name: 'Permission 1'
      },
      p2: {
        id: 'p2',
        name: 'Permission 2'
      }
    };
    this.userGroups = {
      g1: {
        id: 'g1',
        name: 'Group 1',
        permissions: ['p1']
      },
    };
    this.users = {
      u1: {
        id: 'u1',
        name: 'User 1',
        permissions: ['p2'],
        userGroups: ['g1']
      },
    };
  }

  private generateConfigOptions() {
    const permissions: Permission[] = this.getPermissions();
    const userGroups: Permission[] = this.getUserGroups();
    this.configOptions = {
      permission: [],
      userGroup: [
        {
          id: 'permissions',
          options: permissions
        }
      ],
      user: [
        {
          id: 'userGroups',
          options: userGroups
        },
        {
          id: 'permissions',
          options: permissions
        }
      ],
    };
  }
}
