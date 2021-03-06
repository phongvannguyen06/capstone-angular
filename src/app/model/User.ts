export class User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  creditCardNumber: number;
  userName: string;
  password: string;

  role: Role;
}

export enum Role {
  Customer, Administrator
}
