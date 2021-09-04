<template>
    <div>
        <div id="globalContainer" class="container pt-lg-5">
      <div class="row mt-lg-5">
        <!-- Header -->
        <div class="col-12 col-lg-6">
          <div class="d-flex justify-content-center pt-5">
            <a href="#"
              ><img
                src="../assets/logo.png"
                alt="Logo Groupomania"
                width="250"
                height="60"
            /></a>
          </div>
          <div class="container">
            <div class="row pt-5">
              <div class="col mx-4">
                <h2 class="text-center" v-if="mode == 'login'">Restons en contact entre collègues</h2>
                <h2 class="text-center" v-else>S'inscrire</h2>
              </div>
            </div>
          </div>
        </div>

        <!-- Main -->
        <div class="col-12 col-lg-6">
          <div class="container">
            <div class="row mt-2">
              <div class="col-10 offset-1">
                <form class="bg-light rounded shadow-sm mb-5">
                  <div class="row justify-content-center pt-4">
                    <div class="form-group col-11">
                      <label for="email" class="visually-hidden"
                        >Adresse e-mail</label
                      >
                      <input
                        v-model="email"
                        type="email"
                        name="email"
                        class="form-control"
                        placeholder="Adresse e-mail"
                        required
                      />
                    </div>
                    <div class="form-group col-11 pt-2" v-if="mode == 'create'">
                      <label for="username" class="visually-hidden"
                        >Nom d'utilisateur</label
                      >
                      <input
                        v-model="username"
                        type="text"
                        name="username"
                        class="form-control"
                        placeholder="Nom d'utilisateur"
                        required
                      />
                    </div>
                    <div class="form-group col-11 pt-2" v-if="mode == 'create'">
                      <label for="bio" class="visually-hidden">Bio</label>
                      <textarea
                        v-model="bio"
                        name="bio"
                        class="form-control"
                        rows="3"
                        placeholder="Bio"
                        required
                      ></textarea>
                    </div>
                    <div class="form-group col-11 pt-2">
                      <label for="password" class="visually-hidden"
                        >Mot de passe</label
                      >
                      <input
                        v-model="password"
                        type="password"
                        name="password"
                        class="form-control"
                        placeholder="Mot de passe"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-10 offset-1 ft-font pt-2 text-center" v-if="mode == 'login' && status == 'error_login'">Adresse email ou mot de passe invalid(e)</div>
                  <div class="col-10 offset-1 ft-font pt-2 text-center" v-if="mode == 'create' && status == 'error_create'">Adresse email déjà utilisée</div>
                  <div class="d-grid gap-2 col-11 mx-auto">
                    <button
                      @click="login()"
                      name="login"
                      type="button"
                      class="btn btn-danger my-3 fw-bold"
                      :class="{'button--disabled' : !validatedFields}"
                      v-if="mode == 'login'"
                    >
                      Se connecter
                    </button>
                  </div>
                  <div class="d-grid gap-2 col-11 mx-auto">
                    <button
                      @click="createAccount()"
                      name="signup"
                      type="button"
                      class="btn btn-primary my-3 fw-bold"
                      :class="{'button--disabled' : !validatedFields}"
                      v-if="mode == 'create'"
                    >
                      Créer un compte
                    </button>
                  </div>
                  <div class="row justify-content-center my-3">
                    <div class="col-10 border-bottom"></div>
                  </div>
                  <div class="d-grid" v-if="mode == 'login'">
                    <button
                      @click="switchToCreateAccount()"
                      type="button"
                      class="btn btn-primary mt-3 mb-4 mx-auto fw-bold"
                    >
                      Créer un compte
                    </button>
                  </div>
                  <div class="d-grid" v-else>
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
    <footer>
      <div class="bg-light fixed-bt">
        <div class="container">
          <div class="row">
            <div class="col">
              <p class="ft-font text-center mt-3">Groupomania © 2021</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'Login',
  data: function () {
    return {
      mode: 'login',
      email: '',
      username: '',
      bio: '',
      password: '',
    }
  },
  computed: {
    validatedFields: function () {
      if (this.mode == 'create') {
        if (this.email != "" && this.username != "" && this.password != "") {
          return true;
        }else {
          return false;
        }
      }else {
        if (this.email != "" && this.password != "") {
        return true;
      }else {
        return false;
      }
    }
  },
  ...mapState(['status'])
},
methods: {
  switchToCreateAccount: function () {
    this.mode = 'create';
  },
  switchToLogin: function () {
    this.mode = 'login';
  },
  login: function () {
    const self = this;
    this.$store.dispatch('login', {
      email: this.email,
      password: this.password,
    }).then(function () {
      self.$router.push('/home');
    }, function (error) {
      console.log(error);
    })
  },
  createAccount: function () {
    const self = this;
    this.$store.dispatch('createAccount', {
      email: this.email,
      username: this.username,
      bio: this.bio,
      password: this.password,
    }).then(function () {
      self.login();
    }, function (error) {
      console.log(error);
    })
  },
 }
}
</script>
