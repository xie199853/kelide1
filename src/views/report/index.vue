<template>
  <div class="report">
    <show-head />
    <div class="content">
      <headers />
      <result />
    </div>
  </div>
</template>

<script>
import Result from './components/result.vue'
import Headers from './components/headers.vue'
import showHead from './components/showHead.vue'
export default {
  name: 'Report',
  components: { showHead, Headers, Result },

  data() {
    return {

    }
  },

  mounted() {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>
.content{
  background-color: #fff;
}
</style>
