<template>
  <b-list-group id='ArticleDetailComponent'>
    <b-list-group-item class="text-left">
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
import {mapState, mapActions} from 'vuex'
export default {
  name: 'ArticleDetailComponent',

  props: ['articleId'],

  computed: {
    ...mapState(['article'])
  },

  methods: {
    ...mapActions(['getArticle'])
  },

  created () {
    this.getArticle(this.articleId)
  }
}
</script>
<style scoped>
</style>
