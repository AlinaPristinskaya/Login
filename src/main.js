import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/scss/global.scss";
import Axios from "axios";
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.prototype.$http = Axios;

const token = localStorage.getItem("token");

if (token) {
  //заголовок для запросов
  Vue.prototype.$http.defaults.headers.common["Authorization"] = token;
}
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
