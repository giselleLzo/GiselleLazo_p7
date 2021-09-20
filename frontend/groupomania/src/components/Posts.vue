<template>
  <div>
    <main>
      <div class="col-12 col-lg-6 offset-lg-3">
        <div class="container mt-5">
          <div class="row mt-2">
            <div class="col-10 offset-1 bg-light rounded shadow-sm">
              <div class="row">
                <p class="col-5 text-start fw-bold pt-3 pe-0"> Bonjour {{ user.username }} </p>
                <form @click="switchToPostForm()" class="col-7 pt-3 ps-0 ps-lg-5 pe-lg-3">
                  <div class="form-group">
                    <label for="message" class="visually-hidden"
                      >Quoi de neuf !</label
                    >
                    <textarea
                      class="form-control-sm col-12"
                      id="message"
                      rows="1"
                      placeholder="Quoi de neuf !"
                      required
                    ></textarea>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div class="container mt-3">
          <div v-for="(message, id) in messages.slice().reverse()" class="row" :key="id">
            <div class="col-10 offset-1 bg-light rounded shadow-sm mb-5">
              <p class="text-start fw-bold pt-3 pe-0"> {{ message.username }} </p>
              <p class="text-start pe-0"> {{dateTime(message.createdAt)}} </p>
              <p>{{ message.title }}</p>
              <div>
                <img id="post_img" v-if="message.attachment !== '' && message.attachment !== null && (message.attachment.split('.')[2] === 'png' || 'jpg')"  :src="message.attachment" alt="img" class="col-12" />
              </div>
              <p>{{ message.content }}</p>
              <div class="row justify-content-center mt-3">
                <div class="col-11 border-bottom"></div>
              </div>
              <form class="pt-3 ps-0">
                <div class="form-group">
                  <label for="comment" class="visually-hidden"
                    >Écris un commentaire</label
                  >
                  <textarea
                    class="form-control-sm ft-font col-12"
                    id="comment"
                    rows="1"
                    placeholder="Écris un commentaire..."
                    required
                  ></textarea>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
export default {
     name: 'Posts',
     data: function () {
         return {
             title: '',
             content: '',
             attachment: null,

         }
     },
     computed: {
         ...mapState({
             user: 'userInfos',
             users() {
                 return this.$store.state.users
             },
             messages() {
                 return this.$store.state.messages
             },
             comments() {
                 return this.$store.state.comments
             }
         }),
     },
     methods: {
         switchToPostForm: function () {
             this.$router.push('/PostForm')
         },
         dateTime (value) {
             return moment(value).format('DD-MM-YYYY');
         },
         
     }
}
</script>

