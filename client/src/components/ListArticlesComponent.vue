<template>
  <b-list-group id='ListArticlesComponent'>
    <b-list-group-item v-for="article in articles" :key="article._id" class="text-left">
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
        <b-col>
          <b-btn size="sm" variant="info" :to="{ name: 'detail', params: { articleId: article._id}}">
            Readmore
          </b-btn>
        </b-col>
      </b-row>
    </b-list-group-item>
  </b-list-group>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'ListArticlesComponent',

  computed: {
    ...mapState(['articles'])
  }
}
</script>
<style scoped>
</style>
