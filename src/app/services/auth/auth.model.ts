export interface User {
  fullName: string,
  matricule: string,
  categorie: string,
  email: string,
  password: string,
  numero: string,
  is_admin: Boolean,
  id:string;
  type_id:string;
  value:string
}

export interface Credentials {
  token: string;
  user: User;

}
