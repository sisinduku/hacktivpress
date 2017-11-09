import Vue from 'vue'
import Router from 'vue-router'
import MainComponent from '@/components/MainComponent'
import ListArticlesComponents from '@/components/ListArticlesComponents'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: MainComponent,
      children: [{
        path: '',
        name: 'main',
        component: ListArticlesComponents
      }]
    }
  ]
})
