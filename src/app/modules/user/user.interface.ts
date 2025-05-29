export interface TUser extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}
