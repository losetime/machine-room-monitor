<template>
  <div class="location-info-wrapper"></div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
</script>

<style lang="less" scoped>
.location-info-wrapper {
  width: 100%;
  flex: 1;
  margin-top: 50px;
  background-image: url('../../assets/images/overview/location.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50% 20%;
}
</style>
