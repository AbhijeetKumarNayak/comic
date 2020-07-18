import axios from 'axios';
import { showAlert } from './alerts';
export const updateuser = async (email,role) => {
    try {
      const res = await axios({
        method: 'PATCH',
        url: '/updateuser',
        data: {
            email,
            role
        }
      });
  
      if (res.data.status === 'success') {
        showAlert('success', 'Updattion successfully');
        window.setTimeout(() => {
          location.assign('/deleteuser');
        }, 1550);
      }
    } catch (err) {
      showAlert('error', err.response.data.message);
    }
  };
  