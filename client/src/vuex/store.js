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
    updateArticles: (state, payload) => {
      let idx = state.articles.findIndex(article =>
        article._id === payload._id
      )
      state.articles.splice(idx, 1, payload)
    },
    addArticles: (state, payload) => {
      state.articles.push(payload)
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
      return new Promise(function (resolve, reject) {
        http.get(`api/articles/get_article/${payload}`)
          .then(({data}) => {
            context.commit('setCurrentArticle', data)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    updateArticle: (context, payload) => {
      return new Promise(function (resolve, reject) {
        http.put(`api/articles/update_article/${payload._id}`, payload)
          .then(({data}) => {
            context.commit('updateArticles', data)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    postArticle: (context, payload) => {
      return new Promise(function (resolve, reject) {
        http.post(`api/articles/post_article/`, payload)
          .then(({data}) => {
            console.log('sini')
            context.commit('addArticles', data)
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
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
