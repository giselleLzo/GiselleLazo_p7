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
            <li class="nav-item" @click="switchToIndex()">
              <a class="nav-link border-top">Supprimer Compte</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
   </div>
</template>

<script>
let user = localStorage.getItem('user')
export default {
  name: 'Nav',
  user: user,
  methods: {
    logout: function () {
      user = {
                userId: -1,
                token: '',
            }
            localStorage.clear();
      this.$router.push('/');
    },
    switchToIndex: function () {
      this.$router.push('/')
    },
    
  }
}
</script>

<style scoped>
 
 li {
   cursor: pointer;
 }

</style>