import axios from 'axios';
import { showAlert } from './alerts';
export const upload = async (title,author,category,subcategory,hint,description) => {
    try {
      const res = await axios({
        method: 'POST',
        url: '/upload',
        data: {
            title,
            author,
            category,
            subcategory,
            hint,
            description

        }
      });
  
      if (res.data.status === 'success') {
        showAlert('success', 'Document created successfully');
        window.setTimeout(() => {
          location.assign('/createpost');
        }, 1550);
      }
    } catch (err) {
      console.log("nbhjhjh")
      showAlert('error', err.response.data.message);
    }
  };
  