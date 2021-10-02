<template>
  <div>
    <div class="bg-light fixed-bt">
      <div class="container">
        <div class="row">
          <div class="col">
            <p class="ft-font text-center mt-3">Groupomania © 2021</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
   name: 'Footer',
}
</script>

<style scoped>
 @media (min-width: 992px) {
  .fixed-bt {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1030;
  }
}
</style>
