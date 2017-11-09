<template>
  <b-list-group id='PostComponent'>
    <b-list-group-item class="text-left">
      <b-row>
        <b-col>
          <h2>Add new article</h2>
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
import {mapActions, mapState} from 'vuex'
export default {
  name: 'PostComponent',

  data: () => ({
    title: '',
    content: '',
    category: '',
    isUpdated: false
  }),

  computed: {
    ...mapState('user')
  },

  methods: {
    ...mapActions(['postArticle']),
    onSubmit () {
      console.log()
      this.postArticle({
        title: this.title,
        content: this.content,
        category: this.category,
        author: this.user._id
      })
        .then(() => {
          this.isUpdated = true
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
}
</script>
<style scoped>
</style>
