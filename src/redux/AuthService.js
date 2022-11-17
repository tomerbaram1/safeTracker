import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL_REGISTER = "/api/register";
const API_URL_LOGIN = "/api/login";

// register user
const register = async (userData) => {
  console.log(userData.fullName,"name", userData.email,"email", userData.password, "password",userData.phoneNumber, "phone",  )
  const fullName=userData.fullName
  const email=userData.email;
  const password=userData.password
  const phoneNumber=userData.phoneNumber
  console.log("before axios");
  const response = await axios.post('http://10.195.25.166:4000/api/register', {fullName:fullName,email:email,password:password,phoneNumber:phoneNumber});
  console.log('axios in register worked',fullName );
  if (response.data) {
    AsyncStorage.setItem("user", JSON.stringify(response.data));
  }
  console.log(response.data,"user register")
  return response.data;
  
};

// login
const login = async (userData) => {
 console.log(userData.email,"email",userData.password)
  const email=userData.email;
  const password=userData.password
    const response = await axios.post("http://10.195.25.166:4000/api/login",{email:email,password:password} );
    console.log("user data2",email,password)
    
      if (response.data) {
        console.log("response.data1",response.data);
        AsyncStorage.setItem("user", JSON.stringify(response.data));
        console.log("response.data2",response.data);
        console.log("working");
      }
      
   
    
    return response.data;
};

// logout
const logout = async (userData) => {
  AsyncStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};
export default authService;
