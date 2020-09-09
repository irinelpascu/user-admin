import { TestBed } from '@angular/core/testing';

import { UserAdminService } from './user-admin.service';

describe('UserAdminService', () => {
  let service: UserAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create permission', () => {
    service.upsertPermission({id: 'p1', name: 'Perm1'});
    expect(service.getPermissions().length).toBe(1);
    expect(service.getPermissions()).toEqual([{id: 'p1', name: 'Perm1'}]);
  });

  it('should update permission', () => {
    service.upsertPermission({id: 'p1', name: 'Perm1'});
    service.upsertPermission({id: 'p1', name: 'Perm2'});
    expect(service.getPermissions()).toEqual([{id: 'p1', name: 'Perm2'}]);
  });

  it('should create user group', () => {
    service.upsertUserGroup({id: 'g1', name: 'Group1'});
    expect(service.getUserGroups().length).toBe(1);
    expect(service.getUserGroups()).toEqual([{id: 'g1', name: 'Group1'}]);
  });

  it('should update user group with permission', () => {
    service.upsertUserGroup({id: 'g1', name: 'Group1'});
    service.upsertUserGroup({id: 'g1', name: 'Group1', permissions: ['p1']});
    expect(service.getUserGroups()).toEqual([{id: 'g1', name: 'Group1', permissions: ['p1']}]);
  });

  it('should create user', () => {
    service.upsertUser({id: 'u1', name: 'User1'});
    expect(service.getUsers().length).toBe(1);
    expect(service.getUsers()).toEqual([{id: 'u1', name: 'User1'}]);
  });

  it('should update user with permission and user group', () => {
    service.upsertUser({id: 'u1', name: 'User1'});
    service.upsertUser({id: 'u1', name: 'User1', userGroups: ['g1'], permissions: ['p1']});
    expect(service.getUsers()).toEqual([{id: 'u1', name: 'User1', userGroups: ['g1'], permissions: ['p1']}]);
  });

  it('should return aggregate user permissions', () => {
    service.upsertPermission({id: 'p1', name: 'Perm1'});
    service.upsertPermission({id: 'p2', name: 'Perm2'});
    service.upsertUserGroup({id: 'g1', name: 'Group1', permissions: ['p1']});
    service.upsertUser({id: 'u1', name: 'User1', userGroups: ['g1'], permissions: ['p2']});
    expect(service.getUserPermissions('u1')).toEqual([{id: 'p2', name: 'Perm2'}, {id: 'p1', name: 'Perm1'}]);
  });

  it('should return empty user permissions', () => {
    service.upsertPermission({id: 'p1', name: 'Perm1'});
    service.upsertPermission({id: 'p2', name: 'Perm2'});
    service.upsertUserGroup({id: 'g1', name: 'Group1', permissions: ['p1']});
    service.upsertUser({id: 'u1', name: 'User1'});
    expect(service.getUserPermissions('u1')).toEqual([]);
  });

  it('should return null user permissions', () => {
    service.upsertPermission({id: 'p1', name: 'Perm1'});
    service.upsertPermission({id: 'p2', name: 'Perm2'});
    service.upsertUserGroup({id: 'g1', name: 'Group1', permissions: ['p1']});
    service.upsertUser({id: 'u1', name: 'User1'});
    expect(service.getUserPermissions('u2')).toBeNull();
  });

  it('should not return duplicate aggregate user permissions', () => {
    service.upsertPermission({id: 'p1', name: 'Perm1'});
    service.upsertPermission({id: 'p2', name: 'Perm2'});
    service.upsertUserGroup({id: 'g1', name: 'Group1', permissions: ['p2', 'p1']});
    service.upsertUser({id: 'u1', name: 'User1', userGroups: ['g1'], permissions: ['p1', 'p2']});
    expect(service.getUserPermissions('u1')).toEqual([{id: 'p1', name: 'Perm1'}, {id: 'p2', name: 'Perm2'}]);
  });
});
