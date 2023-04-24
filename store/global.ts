import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  name: string;
  email: string;
  password: string;
}

interface State {
  currentUser: User;
  users: User[];
  isLoggedIn: boolean;
  balance: number;
}

interface Actions {
  setCurrentUser: (user: User) => void;
  addUser: (user: User) => void;
  setLoginTrue: () => void;
  setLoginFalse: () => void;
  setBalance: (amount: number) => void;
}

const useGlobalStore = create(
  persist<State & Actions>(
    (set) => ({
      currentUser: {
        name: "",
        email: "",
        password: "",
      },
      users: [],
      isLoggedIn: false,
      balance: 1000,
      setBalance: (amount: number) => set(() => ({ balance: amount })),
      setLoginTrue: () => set(() => ({ isLoggedIn: true })),
      setLoginFalse: () => set(() => ({ isLoggedIn: false })),
      setCurrentUser: (user) => set(() => ({ currentUser: user })),
      addUser: (user: User) =>
        set((state) => ({ users: [...state.users, user] })),
    }),
    {
      name: "badbank-storage",
    }
  )
);

export default useGlobalStore;
