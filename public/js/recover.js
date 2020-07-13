import axios from 'axios';
import { showAlert } from './alerts';
export const recover = async (email) => {
    try {
      const res = await axios({
        method: 'POST',
        url: '/forgotPassword',
        data: {
          email
        }
      });
  
      if (res.data.status === 'success') {
        showAlert('success', 'Message sent successfully');
        window.setTimeout(() => {
          location.assign('/recover');
        }, 1550);
      }
    } catch (err) {
      console.log("nbhjhjh")
      showAlert('error', err.response.data.message);
    }
  };
  