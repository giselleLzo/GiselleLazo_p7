<template>
  <div>
    <div class="col-12">
      <div class="container mt-1 px-3">
        <div class="row mt-3">
          <div v-bind="$attrs" class="col-12 mb-2">
            <form>
              <div class="row justify-content-center">
                <label for="comment" class="form-label visually-hidden">Commentaire</label>
                <textarea
                    v-bind="$attrs"
                    class="form-control"
                    name="comment"
                    ref="comment"
                    placeholder="Écris un commentaire..."
                ></textarea>
              </div>
              <div class="d-grid gap-2 col-5 mx-auto">
                <button
                  v-bind="$attrs"
                  type="submit"
                  class="btn btn-primary mt-3 mb-4 fw-bold"
                  @click="postComment($attrs)"
                  ref="comment"
                  >Publier
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
    name: "postComment",
    data() {
        return {
            userId: localStorage.getItem('userId'),
            token: localStorage.getItem('token'),
            postId: "",
            username: "",
            comment: ""
        }
    },
    methods: {
        postComment() {
            axios.post('http://localhost:3000/api/comments/:postId', {
                    postId: this.$refs.comment.id,
                    userId: localStorage.getItem('userId'),
                    username: this.$refs.username.value,
                    comment: this.$refs.comment.value,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + this.token
                    }
                })
                .then(() => this.$router.go())
        },
    }
}
</script>