<template>
  <div>
    <div class="col-12 col-lg-6 offset-lg-3" v-for="post in posts.slice().reverse()" :key="post.id">
      <div class="container mt-1">
        <div class="row">
          <div class="col-10 offset-1 bg-light rounded shadow-sm mb-3">
            <h3 class="pt-3 mb-0">{{ post.title }}</h3>
            <small class="text-start pe-0 text-secondary" >publié par <span class="fw-bold">{{ post.username }}</span></small>
            <p class="pt-3 mb-1">{{ post.content }}</p>
            <div>
              <img alt="image" class="col-12" :src="post.attachment" />
            </div>
            
            <div class="d-grid gap-2 col-6 mx-auto" >
              <button v-bind="post" @click.prevent="deletePost(post.id)" class="btn btn-sm btn-danger my-3 fw-bold">
                Supprimer le post
              </button>
            </div>

            <div class="row justify-content-center mt-1 mx-0">
              <div class="col-12 border-bottom px-0"></div>
            </div>

            <div v-if="comments">
              <p class="mt-3 fw-bold">Commentaires:</p>
              <div v-for="(comment) in comments.filter((comment) => { return comment.postId == post.id })" :key="comment.id">
                <p class="pt-3 mb-1">{{ comment.comment }}</p>
                <small class="text-start pe-0 text-secondary" >publié par <span class="fw-bold">{{ comment.username }}</span></small>
                <div class="d-grid gap-2 col-9 mx-auto" >
                  <button v-bind="comment" @click.prevent="deleteComment(comment.id)" class="btn btn-sm btn-danger my-3 fw-bold">
                    Supprimer le commentaire
                  </button>
                </div>    
              </div>    
            </div>
             
            <postComment v-bind="$attrs"></postComment>
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
        axios.get('http://localhost:3000/api/posts',
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": 'Bearer ' + this.token
                    }
                })
            .then(res => { this.posts = res.data.posts })
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
            .then(res => { this.comments = res.data.comments })
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
            posts: [],
            post: {},
            comments: [],
            comment: {},
            postId: localStorage.getItem('postId'),
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
            axios.delete(`http://localhost:3000/api/posts/${id}`,
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