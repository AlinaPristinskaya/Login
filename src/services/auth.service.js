import axios from "../utils/axios";

export const loginUser = (payload) => {
  return axios({
    method: "POST",

    url: "login.php",
    data: new FormData(payload),
  })
    .then((response) => response)
    .catch((err) => {
      console.log(err);
    });
};
