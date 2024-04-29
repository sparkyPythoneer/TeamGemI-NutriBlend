import { create } from 'zustand';
import { persist } from 'zustand/middleware';


const useCustomerRegisterDetails = create()(
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
            const storageName = 'talent-signup-storage';
            const storage = get().getStorage();
            storage.removeItem(storageName);
          },
          getStorage: () => localStorage, 
      }),
      {
        name: 'talent-signup-storage',
        getStorage: () => localStorage,
      }
    )
  );

    export default useCustomerRegisterDetails;
    