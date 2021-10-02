<template>
  <div>
    <div class="container pt-lg-5">
      <div class="row mt-lg-5">
        <!-- Header -->
        <div class="col-12 col-lg-6">
          <div class="d-flex justify-content-center pt-5">
            <a href="#">
              <img
                src="@/assets/logo.png"
                alt="Logo Groupomania"
                width="250"
                height="60"
              />
            </a>
          </div>

          <div class="container">
            <div class="row pt-5">
              <div class="col mx-4">
                <h2 class="text-center">S'inscrire</h2>
              </div>
            </div>
          </div>
        </div>

        <!-- Main -->
        <div class="col-12 col-lg-6">
          <div class="container">
            <div class="row mt-2">
              <div class="col-10 offset-1">
                <form class="bg-light rounded shadow-sm mb-5" @submit.prevent="signup()" method="post">
                  <div class="row justify-content-center pt-4">
                    <div class="form-group col-11 pt-2">
                      <label for="username" class="visually-hidden">Nom d'utilisateur</label>
                      <input
                        type="text"
                        name="username"
                        class="form-control"
                        id="username"
                        placeholder="Nom d'utilisateur"
                        
                      />
                    </div>

                    <div class="form-group col-11 pt-2">
                      <label for="email" class="visually-hidden">Adresse e-mail</label>
                      <input
                        type="email"
                        name="email"
                        class="form-control"
                        placeholder="Adresse e-mail"
                        id="email"
                      />
                    </div>

                    <div class="form-group col-11 pt-2">
                      <label for="bio" class="visually-hidden">Bio</label>
                      <textarea
                        name="bio"
                        class="form-control"
                        rows="2"
                        placeholder="Bio"
                        id="bio"
                      ></textarea>
                    </div>

                    <div class="form-group col-11 pt-2">
                      <label for="password" class="visually-hidden">Mot de passe</label>
                      <input
                        type="password"
                        name="password"
                        class="form-control"
                        placeholder="Mot de passe"
                        id="password"
                        
                      />
                    </div>
                  </div>

                  <div class="d-grid gap-2 col-11 mx-auto">
                    <button
                      @click.prevent="signup"
                      name="signup"
                      type="submit"
                      class="btn btn-primary my-3 fw-bold"
                      
                    >
                      Créer un compte
                    </button>
                  </div>
                  <div class="row justify-content-center my-3">
                    <div class="col-10 border-bottom"></div>
                  </div>
                  
                  <div class="d-grid">
                    <p class="text-center mb-0">Déjà inscrit(e) ?</p>
                    <button
                      @click="switchToLogin()"
                      type="button"
                      class="btn btn-danger mt-3 mb-4 mx-auto fw-bold"
                    >
                      Se connecter
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'signup',
    data() {
        return {
            username: "",
            email: "",
            bio: "",
            password: "",
        }
    },
    methods: {
        switchToLogin: function () {
            this.$router.push('/');
        },
        login() {
            this.errorAlert = false;
            axios.post('http://localhost:3000/api/auth/login', {
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
            })
                .then((res) => {
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("userId", res.data.userId)
                    localStorage.setItem("isAdmin", res.data.isAdmin)
                    this.$router.push('/home');
                })
                .catch(() => {
                    this.errorAlert = true
                })
        },
        signup() {
            const self = this;
            this.errorAlert = false;
            axios.post('http://localhost:3000/api/auth/signup', {
                username: document.getElementById('username').value,
                email: document.getElementById('email').value,
                bio: document.getElementById('bio').value,
                password: document.getElementById('password').value,
            })
                .then(() => {
                   
                    self.login();
                })
                .catch(() => {
                    this.errorAlert = true
                })
        }
    }
}
</script>