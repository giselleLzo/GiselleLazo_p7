<template>
  <div>
    <div class="container pt-lg-5">
      <div class="row mt-lg-5">
        <!-- Header-->
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
                <h2 class="text-center">Restons en contact entre collègues</h2>
              </div>
            </div>
          </div>
        </div>

        <!-- Main-->
        <div class="col-12 col-lg-6">
          <div class="container">
            <div class="row mt-2">
              <div class="col-10 offset-1">
                <form class="bg-light rounded shadow-sm mb-5" @submit.prevent="login()" method="post" novalidate="true">
                  <div class="row justify-content-center pt-4">
                    <div class="form-group col-11">
                      <label for="email" class="visually-hidden">Adresse e-mail</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        class="form-control"
                        placeholder="Adresse e-mail"
                      />
                    </div>
                    
                    <div class="form-group col-11 pt-2">
                      <label for="password" class="visually-hidden">Mot de passe</label>
                      <input
                        id="password"
                        type="password"
                        name="password"
                        class="form-control"
                        placeholder="Mot de passe"
                      />
                    </div>

                  </div>

                  <div class="d-grid gap-2 col-11 mx-auto">
                    <button
                      @click.prevent="login"
                      name="login"
                      type="submit"
                      class="btn btn-danger my-3 fw-bold"
                      
                    >
                      Se connecter
                    </button>
                  </div>

                  <div class="row justify-content-center my-3">
                    <div class="col-10 border-bottom"></div>
                  </div>
                  <div class="d-grid">
                    <p class="text-center"> Pas inscrit ? Rejoignez-nous !</p>
                    <button
                      @click.prevent="signupBtn"
                      type="button"
                      class="btn btn-primary mt-3 mb-4 mx-auto fw-bold"
                    >
                      Créer un compte
                    </button>
                  </div>
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
    name: 'login',
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
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
        signupBtn(){
        this.$router.push('Signup');
    }
  }
}
</script>