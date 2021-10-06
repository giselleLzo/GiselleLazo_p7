<template>
  <div>
    <div class="col-12 col-lg-6 offset-lg-3">
      <div class="container mt-5">
        <div class="row mt-2">
          <div class="col-10 offset-1 bg-light rounded shadow-sm mb-5">
            <p class="text-center fs-5 fw-bold pt-3">Crée ton publication</p>
            <div class="row my-3">
              <div class="col border-bottom"></div>
            </div>
            <p class="text-start fw-bold">Bonjour {{ user }} </p>
            <form id="form" @submit.prevent="postImage()" enctype="multipart/form-data">
              <div class="row justify-content-center">
                <div class="form-group">
                  <label for="title">Title</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                  >
                </div>

                <div class="form-group">
                  <label for="content">Content</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    id="content"
                  >
                </div>
              </div>
              <p class="text-start ft-font fw-bold pt-3">Ajouter une image</p>
              <div class="mb-3">
                <label for="attachment" class="form-label visually-hidden">Input fichier</label
                >
                <input
                  class="form-control form-control-sm"
                  id="attachment"
                  type="file"
                  name="attachment"
                  ref="image"
                  v-on:change="handleFileUpload()"
                />
              </div>
              <div class="d-grid gap-2">
                <button
                  type="submit"
                  class="btn btn-primary mt-3 mb-4 fw-bold"
                  @click.prevent="postImage"
                >
                Post
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
import axios from 'axios'
export default {
    name: "Post",
    data() {
        return {
            userId: localStorage.getItem('userId'),
            user: {
              username: ""
            },
            title: "",
            content: "",
            imageUrl: "",
            image: "",
            token: localStorage.getItem('token'),
            
        
        }
    },
    created() {
      
      axios.get('http://localhost:3000/api/users/userId',
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": 'Bearer ' + this.token
                    }
                })
             .then(response => (this.user = response.data.username))
            .catch(err => {
                console.log(err + "Utilisateur non trouvé");
            });
    },
    methods: {
        handleFileUpload() {
            this.image = this.$refs.image.files[0];
            this.imageUrl = URL.createObjectURL(this.image)
        },
        postImage() {
            const formData = new FormData();
            formData.append("userId", parseInt(localStorage.getItem('userId')))
            formData.append("title", document.getElementById('title').value)
            formData.append("content", document.getElementById('content').value)
            formData.append("image", this.image)
                       
            axios.post('http://localhost:3000/api/messages/new',
                    formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": 'Bearer ' + this.token
                    }
                })
                .then(() => this.$router.go())
        },
    }
}
</script>

