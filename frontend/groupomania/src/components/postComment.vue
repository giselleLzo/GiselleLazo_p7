<template>
  <div>
    <div class="col-12">
      <div class="container mt-1 px-3">
        <div class="row mt-3">
          <div class="col-12 mb-2">
            <form id="formComment" @submit.prevent="postComment(messageId)">
              <div class="row justify-content-center">
                <label for="comment" class="form-label visually-hidden">Commentaire</label>
                <textarea
                    class="form-control"
                    name="comment"
                    id="comment"
                    v-model="comment"
                    placeholder="Écris un commentaire..."
                ></textarea>
              </div>
              <div class="d-grid gap-2 col-5 mx-auto">
                <button
                  type="submit"
                  class="btn btn-primary mt-3 mb-4 fw-bold"
                  @click.prevent="postComment(messageId)"
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
        comment: '',
        post: {},
        title :""   
      }
    },
    props:['messageId'],
    methods: {
        postComment(messageId) {
        console.log(messageId)
        let data = {
          comment : this.comment
        }
        axios.post(`http://localhost:3000/api/comments/${messageId}` , data ,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + this.token
          }
        })
        .then(() => {
          this.$router.go();
        });
        }
    }
}
</script>