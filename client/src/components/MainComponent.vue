<template>
  <b-container id='MainComponent' fluid>
    <b-row>
      <b-col>
        <b-navbar toggleable="md" type="dark" variant="info">
          <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
          <b-navbar-brand href="#">hactivpress</b-navbar-brand>
          <b-collapse is-nav id="nav_collapse">
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-item text="Lang" right>
                <b-btn size="sm" variant="primary" v-if="!isLogin" @click="loginFB">
                  Login with Facebook
                </b-btn>
                <b-btn size="sm" variant="danger" v-if="isLogin" @click="logout">
                  Logout
                </b-btn>
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'MainComponent',

  computed: {
    ...mapState(['isLogin'])
  },

  methods: {
    loginFB () {
      window.FB.login((response) => {
        if (response.status === 'connected') {
          this.getToken(response)
        }
      }, {
        scope: 'public_profile'
      })
    },
    logout () {
      window.localStorage.removeItem('token')
      this.$store.commit('logout')
    },
    ...mapActions(['getToken'])
  },

  created () {
    (function (d, s, id) {
      var js
      var fjs = d.getElementsByTagName(s)['0']
      if (d.getElementById(id)) return
      js = d.createElement(s)
      js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: process.env.FBAPPID,
        cookie: true, // enable cookies to allow the server to access
        xfbml: true, // parse social plugins on this page
        version: 'v2.8' // use graph api version 2.8
      })
    }
  }
}
</script>
<style scoped>
</style>
