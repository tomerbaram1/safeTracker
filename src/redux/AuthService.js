import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL_REGISTER = "/api/register";
const API_URL_LOGIN = "/api/login";

// register user
const register = async (userData) => {
  const response = await axios.post('http://10.195.25.169:4000/api/register', userData);
  console.log('1');
  if (response.data) {
    AsyncStorage.setItem("user", JSON.stringify(response.data));
    console.log(response.data,"data");
  }
  return response.data;
};

// login
const login = async (userData) => {
  console.log(userData.email,userData.password,"log");
    const response = await axios.post("http://10.195.25.169:4000/api/login",userData );
    
    console.log("response",response);
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
