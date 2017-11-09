import Vue from 'vue'
import Router from 'vue-router'
// import store from '../vuex/store'
import MainComponent from '@/components/MainComponent'
import ListArticlesComponent from '@/components/ListArticlesComponent'
import ArticleDetailComponent from '@/components/ArticleDetailComponent'
import DashboardComponent from '@/components/DashboardComponent'
import EditComponent from '@/components/EditComponent'
import PostComponent from '@/components/PostComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: MainComponent,
      children: [{
        path: '',
        name: 'main',
        component: ListArticlesComponent
      }, {
        path: '/detail/:articleId',
        name: 'detail',
        props: true,
        component: ArticleDetailComponent
      }, {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardComponent
      }, {
        path: '/dashboard/edit/:articleId',
        name: 'edit',
        props: true,
        component: EditComponent
      }, {
        path: '/dashboard/post/',
        name: 'post',
        component: PostComponent
      }]
    }
  ]
})
// ,
// beforeEnter: (to, from, next) => {
//   if (store.state.isLogin) {
//     next()
//   } else {
//     next('/')
//   }
// }
