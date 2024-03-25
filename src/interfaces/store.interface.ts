import { CartItem } from './cart.interface';
import { Student } from './student.interface';

export interface StudentsStoreData {
  students: Student[];
}

export interface CartStoreData {
  cartItems: CartItem[];
  currency_code: string;
}

export interface AuthStoreData {
  token: string;
}

export interface StudentsStore extends StudentsStoreData {
  addStudent: (student: Student) => void;
  editStudent: (student: Student, index: number) => void;
  selectStudent: (index: number) => void;
  resetState: () => void;
}

export interface CartStore extends CartStoreData {
  addItem: (student: CartItem) => void;
  removeItem: (index: number) => void;
  setCurrency: (currency: string) => void;
  resetState: () => void;
}

export interface AuthStore extends AuthStoreData {
  setToken: (token: string) => void;
  resetState: () => void;
}
