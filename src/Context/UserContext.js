import React, {useMemo, useReducer, useContext, createContext} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


export const AuthContext = createContext()

export const AuthProvider =({children}) =>{
    return(

<AuthContext.Provider value="test">
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