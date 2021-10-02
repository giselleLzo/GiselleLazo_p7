<template>
  <div>
    <SignForm />
    <Footer />
  </div>
</template>

<script>
import SignForm from '@/components/SignForm.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'Signup',
  components: {
    SignForm, Footer
  }
}
</script>