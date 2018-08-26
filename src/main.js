// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'font-awesome/css/font-awesome.min.css'
import router from './router/routes'
import VueRouter from 'vue-router'


Vue.use(ElementUI)
Vue.use(VueRouter)


// router.beforeEach注册一个全局的 before 钩子,不管哪种情况都要掉next()方法
// router.beforeEach((to, from, next) => {
//   if (to.path == '/login') {
//     localStorage.removeItem('token');
//   }
//   let token = localStorage.getItem('token');
//   if (!token && to.path != '/login') {
//     next({ path: '/login' })
//   } else {
//     next()
//   }
// })

export const vueInstance = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')