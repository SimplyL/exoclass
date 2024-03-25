import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  AuthStore,
  AuthStoreData,
  CartStore,
  CartStoreData,
  StudentsStore,
  StudentsStoreData,
} from '@/interfaces/store.interface';
import { Student } from '@/interfaces/student.interface';
import { CartItem } from '@/interfaces/cart.interface';

const initialStudentsState: StudentsStoreData = {
  students: [],
};

const initialCartState: CartStoreData = {
  cartItems: [],
  currency_code: 'EUR',
};

const initialAuthState: AuthStoreData = {
  token: '',
};

export const useStudentsStore = create<StudentsStore>()(
  persist(
    (set) => ({
      ...initialStudentsState,
      addStudent: (student: Student) => {
        set((state) => ({ students: [...state.students, student] }));
      },
      editStudent: (student: Student, index: number) => {
        set((state) => ({ students: Object.assign([], state.students, { [index]: student }) }));
      },
      selectStudent: (index: number) => {
        set((state) => {
          const student = state.students[index];

          return {
            students: Object.assign([], state.students, {
              [index]: { ...student, isSelected: !student.isSelected },
            }),
          };
        });
      },
      resetState: () => set(initialStudentsState),
    }),
    {
      name: 'student-storage',
    },
  ),
);

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      ...initialCartState,
      addItem: (cartItem: CartItem) => {
        set((state) => ({ cartItems: [...state.cartItems, cartItem] }));
      },
      removeItem: (index: number) => {
        set((state) => ({ cartItems: state.cartItems.filter((_, i) => i !== index) }));
      },
      setCurrency: (currency_code: string) => {
        set(() => ({ currency_code }));
      },
      resetState: () => set(initialCartState),
    }),
    {
      name: 'cart-storage',
    },
  ),
);

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialAuthState,
      setToken: (token) => set(() => ({ token: token })),
      resetState: () => set(initialAuthState),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
