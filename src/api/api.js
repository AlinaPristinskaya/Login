import axios from "axios";
// eslint-disable-next-line no-undef
// axios.defaults.baseURL = settings.url;
export default {
  getDataInfo(key, func, uid, status) {
    return axios.get(`index.php`, {
      params: {
        key,
        func,
        uid,
        status,
      },
    });
  },
};
