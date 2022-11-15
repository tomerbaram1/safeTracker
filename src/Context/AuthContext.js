import React, {useMemo, useReducer, useContext, createContext, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { BASE_URL } from "../config";


export const AuthContext = createContext()

export const AuthProvider =({children}) =>{
    const [userInfo,setUserInfo] = useState({})
    const [isLoading,setIsLoading] = useState(false)


    const register = (email,fullName,password,phoneNumber) =>{
        setIsLoading(true)
        axios.post(`${BASE_URL}/api/register`,{
            email,
            fullName,
            password,
            phoneNumber
        }).then(res=>{
            let userInfo=res.data
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo',JSON.stringify(userInfo))
            setIsLoading(false)
            console.log(userInfo);
        })
        .catch(e=>{
            console.log(`Registeration error ${e}`);
            setIsLoading(false)
        })
    }
    const login =(email,password) =>{
        setIsLoading(true)
        axios.post(`${BASE_URL}/api/login`,{
            email,password
        }).then(res=>{
           let userInfo = res.data 
           console.log(userInfo);
           setUserInfo(userInfo)
           AsyncStorage.setItem('userInfo',JSON.stringify(userInfo))
           setIsLoading(false)
        })
        .catch(e=>{
            console.log('login error');
            setIsLoading(false)
        })
    }
    return(

<AuthContext.Provider value={{
    isLoading,
    userInfo,
    register,
    login
    }}>
    {children}
</AuthContext.Provider>
    )  
}















//     // CONFIG KEYS [Storage Keys]===================================
// export const TOKEN_KEY = 'token';
// export const USER_KEY = 'user';
// export const keys = [TOKEN_KEY, USER_KEY];

//   const AuthContext  = createContext();



//  const AuthProvider =(props) =>{
//     const [state, dispatch] = useReducer(reducer, initialState || {});
//     const getAuthState = async () => {
//         try {
//             //GET TOKEN && USER
//             let token = await AsyncStorage.getItem(TOKEN_KEY);
//             let user = await AsyncStorage.getItem(USER_KEY);
//             user = JSON.parse(user);
            
//             if (token !== null && user!== null) await handleLogin({token, user});
//             else await handleLogout();
            
//             return {token, user};
//         } catch (error) {
//             throw new Error(error)
//         }
//     };
//     const handleLogin = async (data) => {
//         try{
//             //STORE DATA
//             let {token, user} = data;
//             let data_ = [[USER_KEY, JSON.stringify(user)], [TOKEN_KEY, token]];
//             await AsyncStorage.multiSet(data_);

//             //AXIOS AUTHORIZATION HEADER
//             axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

//             //DISPATCH TO REDUCER
//             dispatch({type: LOGGED_IN, user:data.user});
//             console.log(` logged in`);
//         }catch (error) {
//             throw new Error(error);
//         }
//     };
//     const handleLogout = async () => {
//         try{

//             //REMOVE DATA
//             await AsyncStorage.multiRemove(keys);

//             //AXIOS AUTHORIZATION HEADER
//             delete axios.defaults.headers.common["Authorization"];

//             //DISPATCH TO REDUCER
//             dispatch({type: LOGGED_OUT});
//         }catch (error) {
//             throw new Error(error);
//         }
//     };
//     const value = useMemo(() => {
//         return {state, getAuthState, handleLogin, handleLogout,};
//     }, [state]);

//     return(
//         <AuthContext.Provider value={value}>
//             {props.children}
//         </AuthContext.Provider>
//     )
// }
// const useAuth = () => useContext(AuthContext);

// export { AuthContext, useAuth }
// export default AuthProvider;