import Vue from 'vue'
import Router from 'vue-router'
import MainComponent from '@/components/MainComponent'
import ListArticlesComponent from '@/components/ListArticlesComponent'
import ArticleDetailComponent from '@/components/ArticleDetailComponent'

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
      }]
    }
  ]
})
