<template>
  <div>
    <div class="col-12 col-lg-6 offset-lg-3" v-for="message in messages.slice().reverse()" :key="message.id">
      <div class="container mt-1">
        <div class="row">
          <div class="col-10 offset-1 bg-light rounded shadow-sm mb-3">
            <h3 class="pt-3 mb-0">{{ message.title }}</h3>
            <small class="text-start pe-0 text-secondary" >publié par <span class="fw-bold">{{ message.username }}</span></small>
            <p class="pt-3 mb-1">{{ message.content }}</p>
            <div>
              <img alt="image" class="col-12" :src="message.attachment" />
            </div>
            
            <div class="d-grid gap-2 col-6 mx-auto" >
              <button v-if="user.id == message.UserId || user.isAdmin == 1" v-bind="message" @click.prevent="deletePost(message.id)" class="btn btn-sm btn-danger my-3 fw-bold">
                Supprimer le post
              </button>
            </div>

            <div class="row justify-content-center mt-2 mx-0">
              <div class="col-12 border-bottom px-0"></div>
            </div>

            <div v-if="comments">
              <p class="mt-3 mb-1 fw-bold">Commentaires:</p>
              <div v-for="(comment) in comments.filter((comment) => { return comment.messageId == message.id })" :key="comment.id">
                <p class="pt-0 mb-0">{{ comment.comment }}</p>
                <small class="text-start pe-0 text-secondary" >publié par <span class="fw-bold">{{ comment.username }}</span></small>
                <div class="d-grid gap-2 col-9 mx-auto" >
                  <button v-if="user.id == comment.UserId || user.isAdmin == 1" v-bind="comment" @click.prevent="deleteComment(comment.id)" class="btn btn-sm btn-danger my-3 fw-bold">
                    Supprimer le commentaire
                  </button>
                </div>    
              </div>    
            </div>
             
            <postComment v-bind:messageId="message.id"></postComment>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import postComment from '../components/postComment.vue'
export default {
    name: 'Wall',
    components: {
        postComment
    },
    created() {
        axios.get('http://localhost:3000/api/messages',
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": 'Bearer ' + this.token
                    }
                })
            .then(res => { this.messages = res.data.messages })
            .catch(err => {
                console.log(err + "Posts non trouvés");
            });
        axios.get('http://localhost:3000/api/comments',
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": 'Bearer ' + this.token
                    }
                })
            .then(res => (this.comments = res.data.comments))
            .catch(err => {
                console.log(err + "Commentaires non trouvés");
            });
        axios.get('http://localhost:3000/api/users',
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": 'Bearer ' + this.token
                    }
                })
            .then(res => { this.users = res.data.users })
            .catch(err => {
                console.log(err + "Utilisateur non trouvé");
            });
    },
    data() {
        return {
            messages: [],
            message: {},
            comments: [],
            comment: {
              username:"",
              comment:""
            },
            messageId: localStorage.getItem('messageId'),
            userId: localStorage.getItem('userId'),
            users: [],
            user: {
                id: localStorage.getItem('userId'),
                isAdmin: localStorage.getItem('isAdmin')
            },
            token: localStorage.getItem('token')
        }
    },
    methods: {
        deletePost(id) {
            axios.delete(`http://localhost:3000/api/messages/${id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": "Bearer " + this.token
                        }
                    })
                .then(() => this.$router.go())
        },
        deleteComment(id) {
            axios.delete(`http://localhost:3000/api/comments/${id}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": "Bearer " + this.token
                        }
                    })
                .then(() => this.$router.go())
        }
    }
}
</script>