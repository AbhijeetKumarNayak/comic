import axios from 'axios';
import { showAlert } from './alerts';
export const createuser = async (name,email,password,confirmPassword) => {
    try {
      const res = await axios({
        method: 'POST',
        url: '/createuser',
        data: {
          name,
          email,
          password,
          confirmPassword
        }
      });
  
      if (res.data.status === 'success') {
        showAlert('success', 'Account created successfully');
        window.setTimeout(() => {
          location.assign('/createuser');
        }, 1550);
      }
    } catch (err) {
      console.log(err);
      showAlert('error', err.response.data.message);
    }
  };
  