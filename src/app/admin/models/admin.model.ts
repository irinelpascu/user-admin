export interface Configurable {
  id: string;
  name: string;
}

export interface Permission extends Configurable {
}

export interface UserGroup extends Configurable {
  permissions?: string[];
}

export interface User extends Configurable {
  permissions?: string[];
  userGroups?: string[];
}

export interface ConfigOption {
  id: string,
  options: Configurable[];
}
