import axios from "../utils/axios";
import { loginUser } from "../services/auth.service";
export default {
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: "",
    role: "",
    error: "",
  },

  mutations: {
    auth_success(state, payload) {
      state.status = payload.success;
      state.token = payload.token;
      state.user = payload.user;
      state.role = payload.role;
    },
    auth_error(state, payload) {
      state.status = "error";
      state.error = payload.error;
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.error = "";
      state.role = "";
      state.user = "";
      localStorage.removeItem("token");
    },
  },
  actions: {
    async login({ commit }, payload) {
      commit("logout");
      const { data } = await loginUser(payload);
      console.log(data);
      if (data.error) {
        const error = data.error;
        commit("auth_error", {
          error: error,
        });
      } else {
        const token = data.data[2].sessionId;
        const user = data.data[0].userId;
        const role = data.data[1].role;
        const success = data.success;
        localStorage.setItem("token", token);
        commit("auth_success", {
          token: token,
          role: role,
          user: user,
          success: success,
        });
      }
    },

    async logout({ commit, state }) {
      let bodyFormData = new FormData();
      bodyFormData.append("key", state.token);
      await axios({
        method: "POST",
        url: "login.php",
        data: bodyFormData,
      })
        .then((resp) => {
          if (resp.data.error) {
            const error = resp.data.error;
            commit("auth_error", {
              error: error,
            });
          }
          commit("logout");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
};
