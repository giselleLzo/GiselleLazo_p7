<template>
    <div>
        <div id="globalContainer" class="container pt-lg-5">
      <div class="row mt-lg-5">
        <!-- Header -->
        <div class="col-12 col-lg-6">
          <div class="d-flex justify-content-center pt-5">
            <a href="index.html"
              ><img
                src="images/logo.png"
                alt="Logo Groupomania"
                width="250"
                height="60"
            /></a>
          </div>
          <div class="container">
            <div class="row pt-5">
              <div class="col mx-4">
                <h2 class="text-center">Restons en contact entre collègues</h2>
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
                        id="email"
                        name="email"
                        class="form-control"
                        placeholder="Adresse e-mail"
                        required
                      />
                    </div>
                    <div class="form-group col-11 pt-2">
                      <label for="password" class="visually-hidden"
                        >Mot de passe</label
                      >
                      <input
                        type="password"
                        id="password"
                        name="password"
                        class="form-control"
                        placeholder="Mot de passe"
                        required
                      />
                    </div>
                  </div>
                  <div class="d-grid gap-2 col-11 mx-auto">
                    <button
                      id="login"
                      type="button"
                      class="btn btn-danger my-3 fw-bold"
                      @click="switchToLogin()"
                    >
                      Se connecter
                    </button>
                  </div>
                  <div class="row justify-content-center my-3">
                    <div class="col-10 border-bottom"></div>
                  </div>
                  <div class="d-grid">
                    <button
                      id="login"
                      type="button"
                      class="btn btn-primary mt-3 mb-4 mx-auto fw-bold"
                      @click="switchToCreateAccount()"
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