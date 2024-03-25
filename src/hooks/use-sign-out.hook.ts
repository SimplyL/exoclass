import { useAuthStore, useCartStore, useStudentsStore } from '@/store';

export interface UseSignOutReturn {
  signOut: () => void;
}

export const useSignOut = () => {
  const resetCart = useCartStore((state) => state.resetState);
  const resetStudents = useStudentsStore((state) => state.resetState);
  const resetAuth = useAuthStore((state) => state.resetState);

  const signOut = () => {
    resetCart();
    resetStudents();
    resetAuth();
  };

  return {
    signOut,
  };
};
