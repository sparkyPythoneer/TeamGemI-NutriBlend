import { create } from 'zustand';
import { persist } from 'zustand/middleware';


const useCustomerDetailsStore = create()(
    persist(
        (set, get) => ({
            userId: null,
            userData: null,
            setUserData: (data) => set({ userData: { ...get().userData, ...data } }),
            setUserId: (data) => set({ userId: data }),
            resetStore: () => {
                set({
                    userId: null,
                    userData: null,
                });
            },
            clearStorage: () => {
                const storageName = 'user-details-storage';
                const storage = get().getStorage();
                storage.removeItem(storageName);
            },
            getStorage: () => localStorage,
        }),
        {
            name: 'user-details-storage',
            getStorage: () => localStorage,
        }
    )
);

export default useCustomerDetailsStore;
