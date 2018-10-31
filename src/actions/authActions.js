import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { 
  GET_ERRORS,
  SET_CURRENT_USER
} from "./types";

//register user
export const registeruser = (userData, history) => dispatch => {
  
    axios.post("/api/users/register", userData)
       .then(res => history.push('/login'))
       .catch(err => dispatch({
         type:GET_ERRORS,
         payload: err.response.data
       })
       )
  }


  //Login user with token


  export const loginuser = userData => dispatch => {

    axios.post("/api/users/login", userData)
      .then(res => {

        // save user token to local storage 
        const { token } = res.data;
        
        localStorage.setItem("jwtToken", token);

        // set token to auth header i.e authorization 
        setAuthToken(token);

        // decode the token and saveuser to deoded

        const decoded = jwt_decode(token);

        //set current user 
        dispatch(setCurrentUser(decoded));


      })
      .catch(err => dispatch({
        type:GET_ERRORS,
        payload: err.response.data
      })
      )
  }

  //set lgged in user

  export const setCurrentUser = (decoded) => {
    return {
      type:SET_CURRENT_USER,
      payload:decoded
    }
  }

  //logout user

  export const logoutuser = () => dispatch => {
    // remove token from local storage
    localStorage.removeItem("jwtToken");
    //remove auth header for duture authorization
    setAuthToken(false);
    //set current User to empty oject so isAuthentication wll become false
    dispatch(setCurrentUser({}));
  }