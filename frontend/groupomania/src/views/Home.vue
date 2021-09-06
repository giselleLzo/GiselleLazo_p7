<template>
    <div id="home">
       <Nav />
       <Post />
       <Footer />
    </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import Post from '@/components/Post.vue';
import Footer from '@/components/Footer.vue';

export default {
    created(){
        this.$store.dispatch('getUsers');
        this.$store.dispatch('getUserInfos');
        this.$store.dispatch('getPostsInfos');
        this.$store.dispatch('getComments');
    },
    name: 'Home',
    components: {
        Nav,
        Post,
        Footer,
    },
};
</script>
