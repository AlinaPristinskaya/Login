import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index.js";
import Login from "../views/Login.vue";
import ProcessingOrder from "../views/ProcessingOrder.vue";
import Settings from "../views/Settings";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: { name: "processingOrder" },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/processingOrder",
    name: "processingOrder",
    component: ProcessingOrder,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
//проверка на несанкционированный доступ.
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
