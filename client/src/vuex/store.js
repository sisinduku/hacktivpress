import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwtdecode from 'jwt-decode'

Vue.use(Vuex)
const http = axios.create({
  baseURL: 'http://localhost:3000/'
})

export default new Vuex.Store({
  strict: true,

  state: {
    isLogin: false,
    user: {},
    articles: [],
    article: {}
  },

  getters: {
    userArticle: (state) => {
      return state.articles.filter((article) => {
        if (article.author) {
          return article.author._id === state.user._id
        } else {
          return false
        }
      })
    }
  },

  mutations: {
    setUser: (state, payload) => {
      const token = window.localStorage.getItem('token')
      if (token) {
        const decodedUser = jwtdecode(token)
        state.user = decodedUser
        state.isLogin = true
      }
    },
    logout: (state, payload) => {
      state.isLogin = false
      window.localStorage.removeItem('token')
    },
    setArticles: (state, payload) => {
      state.articles = payload
    },
    setCurrentArticle: (state, payload) => {
      state.article = payload
    }
  },

  actions: {
    getArticles: (context, payload) => {
      http.get(`api/articles/get_articles/`)
        .then(({data}) => {
          context.commit('setArticles', data)
        })
    },
    getArticle: (context, payload) => {
      http.get(`api/articles/get_article/${payload}`)
        .then(({data}) => {
          context.commit('setCurrentArticle', data)
        })
    },
    getToken: (context, payload) => {
      http.get('api/auth/', {
        headers: {
          accesstoken: payload.authResponse.accessToken,
          userid: payload.authResponse.userID
        }
      })
        .then(({data}) => {
          localStorage.setItem('token', data.token)
          context.commit('setUser')
          context.dispatch('getArticles', data._id)
        })
    }
  }
})
