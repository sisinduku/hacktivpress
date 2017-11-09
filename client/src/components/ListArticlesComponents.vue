<template>
  <b-list-group id='ListArticlesComponents'>
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
    </b-list-group-item>
  </b-list-group>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'ListArticlesComponents',

  computed: {
    ...mapState(['articles'])
  }
}
</script>
<style scoped>
</style>
