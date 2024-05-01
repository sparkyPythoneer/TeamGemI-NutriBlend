"use client"
import { createContext, useContext, useEffect, useState, ReactNode, useMemo } from 'react';
import { getAccessToken } from '@/utils/tokens';
import useCustomerDetailsStore from './userDetailsStore';
import { Axios } from '@/lib/axios';




const initialUserContext = {
    userInfo: null,
    isLoading: true,
};
export const UserInfoContext = createContext(initialUserContext);


export function UserProvider({ children }) {
    const { setUserData, userData, UserId } = useCustomerDetailsStore();
    const [userState, setUserState] = useState({
        userInfo: userData,
        isLoading: true,
    });

    const fetchData = async (jwtToken) => {
        try {
            if (userData?.first_name !== undefined && jwtToken) {
                setUserState((prev) => ({ ...prev, isLoading: false }));
                return
            }

            else if ((userData === null || userData?.first_name == undefined) && UserId !== null && jwtToken) {
                setUserState({
                    userInfo: null,
                    isLoading: true,
                });

                const response = await Axios.get(`user/auth/details/`);
                console.log(response)
                const NewuserData = response.data ;
                setUserData(NewuserData);
                setUserState({
                    userInfo: NewuserData,
                    isLoading: false,
                });

            }

        } catch (error) {
            console.log('error', error);
            setUserState((prev) => ({ ...prev, isLoading: false }));
        } finally {
            setUserState((prev) => ({ ...prev, isLoading: false }));
        }
    };

    useEffect(() => {
        const jwtToken = getAccessToken();
        fetchData(jwtToken);

        const accessTokenChangeListener = (e) => {
            if (e.data === 'accessTokenChange' || e.data === 'userTypeChange') {
                setUserState({ userInfo: null, isLoading: true });
                setUserData(null)
                const newToken = getAccessToken();
                if (newToken) {
                    fetchData(newToken);
                }
                else {
                    setUserState({  userInfo: null, isLoading: false });
                }
            }

        };

        window.addEventListener('message', accessTokenChangeListener);

        return () => {
            window.removeEventListener('message', accessTokenChangeListener);
        };
    }, [getAccessToken()]);

    return (
        <UserInfoContext.Provider value={userState}>
            {children}
        </UserInfoContext.Provider>
    );
}





export function useUser() {
    const { user, isLoading, userInfo, } = useContext(UserInfoContext);
    return { user, isLoading, userInfo };
}