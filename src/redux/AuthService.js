import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL_REGISTER = "/api/register";
const API_URL_LOGIN = "/api/login";

// register user
const register = async (userData) => {
  const fullName=userData.fullName
  const email=userData.email;
  const password=userData.password
  const phoneNumber=userData.phoneNumber
  const response = await axios.post('http://10.195.25.143:4000/api/register', {fullName:fullName,email:email,password:password,phoneNumber:phoneNumber});
  if (response.data) {
    AsyncStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
  
};

// login
const login = async (userData) => {

  const email=userData.email;
  const password=userData.password
    const response = await axios.post("http://10.195.25.143:4000/api/login",{email:email,password:password} );

    
      if (response.data) {
        AsyncStorage.setItem("user", JSON.stringify(response.data));
      }
      
   
    
    return response.data;
};

// logout
const logout = async () => {
  AsyncStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};
export default authService;
