import axios from 'axios';
import { showAlert } from './alerts';
export const deletepost = async (title) => {
    try {
      const res = await axios({
        method: 'POST',
        url: '/deletepost',
        data: {
          title
        }
      });
  
      if (res.data.status === 'success') {
        showAlert('success', 'post deleted  successfully');
        window.setTimeout(() => {
          location.assign('/deleteuser');
        }, 1550);
      }
    } catch (err) {
      console.log("nbhjhjh")
      showAlert('error', err.response.data.message);
    }
  };
  