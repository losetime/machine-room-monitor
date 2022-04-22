<template>
  <div class="location-info-wrapper">
    <div class="mark-wrap water-position-one">
      <span>{{ waterPoint1?.pointLocation }}</span>
      <img :src="waterPoint1.normal ? waterNormal : waterWarning" alt="" />
    </div>
    <div class="mark-wrap water-position-two">
      <span>{{ waterPoint2?.pointLocation }}</span>
      <img :src="waterPoint2.normal ? waterNormal : waterWarning" alt="" />
    </div>
    <div class="mark-wrap sensor-position-one">
      <span>{{ point1?.pointLocation }}</span>
      <div class="info-wrap">
        <p>温度 {{ point1?.temperature }}℃</p>
        <p>湿度 {{ point1?.humidity }}%</p>
      </div>
      <img :src="point1.normal ? sensorNormal : sensorWarning" alt="" />
    </div>
    <div class="mark-wrap sensor-position-two">
      <span>{{ point2?.pointLocation }}</span>
      <div class="info-wrap">
        <p>温度 {{ point2?.temperature }}℃</p>
        <p>湿度 {{ point2?.humidity }}%</p>
      </div>
      <img :src="point2.normal ? sensorNormal : sensorWarning" alt="" />
    </div>
    <div class="mark-wrap sensor-position-three">
      <span>{{ point3?.pointLocation }}</span>
      <div class="info-wrap">
        <p>温度 {{ point3?.temperature }}℃</p>
        <p>湿度 {{ point3?.humidity }}%</p>
      </div>
      <img :src="point3.normal ? sensorNormal : sensorWarning" alt="" />
    </div>
    <div class="mark-wrap sensor-position-four">
      <span>{{ point4?.pointLocation }}</span>
      <div class="info-wrap">
        <p>温度 {{ point4?.temperature }}℃</p>
        <p>湿度 {{ point4?.humidity }}%</p>
      </div>
      <img :src="point4.normal ? sensorNormal : sensorWarning" alt="" />
    </div>
    <div class="mark-wrap sensor-position-five">
      <span>{{ point5?.pointLocation }}</span>
      <div class="info-wrap">
        <p>温度 {{ point5?.temperature }}℃</p>
        <p>湿度 {{ point5?.humidity }}%</p>
      </div>
      <img :src="point5.normal ? sensorNormal : sensorWarning" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import waterNormal from '@/assets/images/overview/water-location-normal.png'
import waterWarning from '@/assets/images/overview/water-location-warning.png'
import sensorNormal from '@/assets/images/overview/sensor-normal.png'
import sensorWarning from '@/assets/images/overview/sensor-warning.png'

const props = defineProps<{
  overviewData: any[]
  pointState: any[]
}>()

const point1 = computed(() => props.overviewData.filter((item: any) => item.pointCode === '1')[0] || {})

const point2 = computed(() => props.overviewData.filter((item: any) => item.pointCode === '2')[0] || {})

const point3 = computed(() => props.overviewData.filter((item: any) => item.pointCode === '3')[0] || {})

const point4 = computed(() => props.overviewData.filter((item: any) => item.pointCode === '4')[0] || {})

const point5 = computed(() => props.overviewData.filter((item: any) => item.pointCode === '5')[0] || {})

const waterPoint1 = computed(() => props.pointState.filter((item: any) => item.pointCode === '1')[0] || {})

const waterPoint2 = computed(() => props.pointState.filter((item: any) => item.pointCode === '2')[0] || {})
</script>

<style lang="less" scoped>
.sensor-position {
  position: absolute;
  img {
    width: 215px;
  }
  span {
    left: -40px;
  }
  .info-wrap {
    position: absolute;
    top: 10px;
    left: 24px;
    p {
      margin: 0;
      color: #ffffff;
      font-size: 30px;
    }
  }
}

.location-info-wrapper {
  width: 95%;
  flex: 1;
  margin-top: 50px;
  background-image: url('../../assets/images/overview/location.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 100% 100%;
  position: relative;

  .mark-wrap {
    span {
      display: inline-block;
      width: 300px;
      text-align: center;
      position: absolute;
      top: -65px;
      font-size: 40px;
      font-weight: bold;
      color: #ffffff;
    }
  }
  .water-position-one {
    position: absolute;
    top: 34%;
    right: 6%;
    img {
      width: 93px;
      height: 269px;
    }
    span {
      left: -100px;
    }
  }
  .water-position-two {
    position: absolute;
    top: 10%;
    left: 32%;
    img {
      width: 93px;
      height: 269px;
    }
    span {
      left: -100px;
    }
  }

  .sensor-position-one {
    top: 34.5%;
    left: 14.2%;
    .sensor-position;
  }
  .sensor-position-two {
    top: 41%;
    left: 27.5%;
    .sensor-position;
  }
  .sensor-position-three {
    top: 49.5%;
    left: 43%;
    .sensor-position;
  }
  .sensor-position-four {
    top: 14%;
    left: 66.2%;
    .sensor-position;
  }
  .sensor-position-five {
    top: 2.7%;
    left: 40.5%;
    .sensor-position;
  }
}
</style>
