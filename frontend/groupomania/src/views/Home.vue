 <template>
  <div>
    <Nav />
    <Post />
    <Wall />
    <Footer />
  </div>
</template>

<script>
  import Nav from '@/components/Nav.vue'
  import Post from '@/components/Post.vue'
  import Wall from '@/components/Wall.vue'
  import Footer from '@/components/Footer.vue'
  export default {
    name: 'Home',
    components: {
      Nav, Post, Wall, Footer
    }
  }
</script>
