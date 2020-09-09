export interface Configurable {
  id: string;
  name: string;
}

export interface Permission extends Configurable {
}

export interface UserGroup extends Configurable {
  permissions?: Permission[];
}

export interface User extends Configurable {
  permissions?: Permission[];
  groups?: UserGroup[];
}

export interface ConfigOption {
  id: string,
  options: Configurable[];
}
