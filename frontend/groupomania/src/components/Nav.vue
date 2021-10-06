<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a href="#">
          <div class="navbar-brand brand-light"
            ><img
              src="@/assets/logo.png"
              alt="Logo Groupomania"
              width="250"
              height="60"
          /></div>
        </a>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mb-2 mb-lg-0 ms-auto">
            <li class="nav-item" @click="logout()"> 
              <a class="nav-link border-top">Déconnexion</a>
            </li>
            <li class="nav-item" v-if="user == user || user.isAdmin == 1" v-bind="user" @click.prevent="deleteUser(userId)">
              <a class="nav-link border-top" >Supprimer Compte</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
   </div>
</template>

<script>
import axios from "axios";
let user = localStorage.getItem('user');
export default {
  name: 'Nav',
  user: user,
  props: {
      user: {}
  },
  data() {
      return {
        userId: localStorage.getItem('userId'),
            users: [],
            
                id: localStorage.getItem('userId'),
                isAdmin: localStorage.getItem('isAdmin'),
           
          token: localStorage.getItem('token')
      }
  },
  created() {
      
      axios.get('http://localhost:3000/api/users/userId',
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": 'Bearer ' + this.token
                    },
                    id: localStorage.getItem('userId'),
                })
             .then(response => (this.users = response.data.users))
            .catch(err => {
                console.log(err + "Utilisateur non trouvé");
            });
    },
  methods: {
    logout: function () {
      user = {
                userId: -1,
                token: '',
            }
            localStorage.clear();
      this.$router.push('/');
    },
    deleteUser(userId) {
        axios.delete(`http://localhost:3000/api/users/${userId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + this.token
                }
            })
            .then(() => {
              localStorage.clear();
              this.$router.push('/signup')})
    }
  }
}
</script>

<style scoped>
 
 li {
   cursor: pointer;
 }

</style>