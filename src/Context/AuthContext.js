import React, {useEffect, useReducer, useContext, createContext, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { BASE_URL } from "../config";


export const AuthContext = createContext()

export const AuthProvider =({children}) =>{
    const [userInfo,setUserInfo] = useState({})
    const [splashLoading, setSplashLoading] = useState(false);
    const [isLoading,setIsLoading] = useState(false)
    const API_URL_REGISTER = "/api/register";
    const API_URL_LOGIN = "/api/login";
    



    const register =  (email,fullName,password,phoneNumber) =>{
        setIsLoading(true)
        axios.post(API_URL_REGISTER,{
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
    const login = async(email,password) =>{
        setIsLoading(true)
        console.log('1');
        console.log(userInfo);
        await axios.post('http://172.20.10.3:4000/api/login',{
            email,password
        }).then(res=>{
            
            
            let userInfo = res.data 
            console.log(userInfo);
            setUserInfo(userInfo)
            AsyncStorage.setItem('userInfo',JSON.stringify(userInfo))
            setIsLoading(false)
            console.log('3');
            
        })
        .catch(e=>{
            console.log(`login error ${e}`);
            setIsLoading(false)
        })
    }

    const logout = async (userData) => {
        AsyncStorage.removeItem("userInfo");
      };

      
  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };
  useEffect(() => {
    isLoggedIn();
  }, []);


    return(
        
        <AuthContext.Provider value={{
            isLoading,
            userInfo,
            splashLoading,
            register,
            login,
            logout
        }}>
    {children}
</AuthContext.Provider>
    )  
}



// const register = async (userData) =>{
//     setIsLoading(true)
//     const response= await axios.post(API_URL_REGISTER,userData)

//     if(response.data){
//         AsyncStorage.setItem('user',JSON.stringify(response.data))
//         setIsLoading(false)
//         console.log(response.data);
//     }
//     return response.data 
// }





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