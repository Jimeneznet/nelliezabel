export type User = {
  nombre: string;
  rut: string;
  id: string;
  email: string;
  rol: string;
  status: string;
  uid: string;
};

export enum UserRole {
  Aministrador = "Administrador",
  Consultor = "Consultor",
}

export type Action = { type: "login" | "singout"; user: User | {} };

export type userContextType = {
  user: User | {};
  dispatch: React.Dispatch<Action>;
}