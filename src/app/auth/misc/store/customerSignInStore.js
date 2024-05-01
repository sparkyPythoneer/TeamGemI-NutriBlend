import { create } from 'zustand';
import { persist } from 'zustand/middleware';


const useCustomerLoginetails = create()(
    persist(
      (set, get) => ({
        step: 1,
        userData: { email: '', first_name: '', password: '', },
        moveToNextStep: () => set((state) => ({ step: state.step + 1 })),
        setUserData: (data) => set({ userData: { ...get().userData, ...data } }),
        resetStore: () => {
            set({
              step: 1,
              userData: {
                email: '',
                first_name: '',
                password: '',
              },
            });
          },
          clearStorage: () => {
            const storageName = 'user-signin-storage';
            const storage = get().getStorage();
            storage.removeItem(storageName);
          },
          getStorage: () => localStorage, 
      }),
      {
        name: 'user-signin-storage',
        getStorage: () => localStorage,
      }
    )
  );

    export default useCustomerLoginetails;
    