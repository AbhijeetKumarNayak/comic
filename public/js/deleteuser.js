import axios from 'axios';
import { showAlert } from './alerts';
export const deleteuser = async (email) => {
    try {
      const res = await axios({
        method: 'POST',
        url: '/deleteuser',
        data: {
          email
        }
      });
  
      if (res.data.status === 'success') {
        showAlert('success', 'User deleted  successfully');
        window.setTimeout(() => {
          location.assign('/deleteuser');
        }, 1550);
      }
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  };
  