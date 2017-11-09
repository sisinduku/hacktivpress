<template>
  <b-list-group id='DashboardComponent'>
    <h1>My Articles</h1>
    <b-btn size="sm" variant="info" :to="{ name: 'post', params: {}}">
      Add Article
    </b-btn>
    <b-list-group-item v-for="article in userArticle" :key="article._id" class="text-left">
      <b-row>
        <b-col>
          <h2>{{article.title}}</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <p>{{article.content}}</p>
          <small>Posted by: {{(article.author) ? article.author.username : 'unknown'}}</small>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="1" no-gutters="true">
          <b-btn size="sm" variant="info" :to="{ name: 'edit', params: { articleId: article._id}}">
            Edit
          </b-btn>
        </b-col>
        <b-col md="1">
          <b-btn size="sm" variant="danger">
            Delete
          </b-btn>
        </b-col>
      </b-row>
    </b-list-group-item>
  </b-list-group>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'DashboardComponent',

  computed: {
    ...mapGetters(['userArticle'])
  }
}
</script>
<style scoped>
</style>
