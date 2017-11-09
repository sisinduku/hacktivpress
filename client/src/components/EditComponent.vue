<template>
  <b-list-group id='EditComponent'>
    <b-list-group-item class="text-left">
      <b-row>
        <b-col>
          <h2>{{article.title}}</h2>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form @submit="onSubmit">
            <b-form-group label="Title address:">
              <b-form-input v-model="title"
                      type="text"
                      placeholder="Enter title"></b-form-input>
            </b-form-group>
            <b-form-group label="Enter content">
              <b-form-textarea id="textarea1"
                               v-model="content"
                               placeholder="Enter something"
                               :rows="3"
                               :max-rows="6">
              </b-form-textarea>
            </b-form-group>
            <b-form-group label="Enter category:">
              <b-form-input v-model="category"
                      type="text"
                      placeholder="Enter your name"></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="secondary">Reset</b-button>
          </b-form>
          <b-alert v-if="isUpdated" show variant="success">
            <ul>Updated</ul>
          </b-alert>
        </b-col>
      </b-row>
    </b-list-group-item>
  </b-list-group>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'EditComponent',

  props: ['articleId'],

  data: () => ({
    title: '',
    content: '',
    category: '',
    isUpdated: false
  }),

  computed: {
    ...mapState(['article'])
  },

  methods: {
    ...mapActions(['getArticle', 'updateArticle']),
    onSubmit () {
      this.updateArticle({
        _id: this.article._id,
        title: this.title,
        content: this.content,
        category: this.category
      })
        .then(() => {
          this.isUpdated = true
        })
        .catch((err) => {
          console.error(err)
        })
    }
  },

  created () {
    this.getArticle(this.articleId)
      .then(() => {
        this.title = this.article.title
        this.content = this.article.content
        this.category = this.article.category
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
</script>
<style scoped>
</style>
