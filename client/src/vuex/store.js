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
    articles: []
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
    }
  },

  actions: {
    getArticles: (context, payload) => {
      http.get(`api/articles/get_articles/`)
        .then(({data}) => {
          context.commit('setArticles', data)
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
