<template>
  <div class="location-info-wrapper">
    <div class="mark-wrap water-position-one">
      <span>{{ waterPoint1?.pointLocation }}</span>
      <img :src="waterPoint1.normal ? waterNormal : waterWarning" alt="" />
    </div>
    <div class="mark-wrap sensor-position-one">
      <span>{{ point1?.pointLocation }}</span>
      <div class="info-wrap">
        <p>温度 {{ point1?.temperature }}℃</p>
        <p>湿度 {{ point1?.humidity }}%</p>
      </div>
      <img :src="isNormal(point1.temperature, point1.humidity) ? sensorNormal : sensorWarning" alt="" />
    </div>
    <div class="mark-wrap sensor-position-two">
      <span>{{ point2?.pointLocation }}</span>
      <div class="info-wrap">
        <p>温度 {{ point2?.temperature }}℃</p>
        <p>湿度 {{ point2?.humidity }}%</p>
      </div>
      <img :src="isNormal(point2.temperature, point2.humidity) ? sensorNormal : sensorWarning" alt="" />
    </div>
    <div class="mark-wrap sensor-position-three">
      <span>{{ point3?.pointLocation }}</span>
      <div class="info-wrap">
        <p>温度 {{ point3?.temperature }}℃</p>
        <p>湿度 {{ point3?.humidity }}%</p>
      </div>
      <img :src="isNormal(point3.temperature, point3.humidity) ? sensorNormal : sensorWarning" alt="" />
    </div>
    <div class="mark-wrap sensor-position-four">
      <span>{{ point4?.pointLocation }}</span>
      <div class="info-wrap">
        <p>温度 {{ point4?.temperature }}℃</p>
        <p>湿度 {{ point4?.humidity }}%</p>
      </div>
      <img :src="isNormal(point4.temperature, point4.humidity) ? sensorNormal : sensorWarning" alt="" />
    </div>
    <div class="mark-wrap sensor-position-five">
      <span>{{ point5?.pointLocation }}</span>
      <div class="info-wrap">
        <p>温度 {{ point5?.temperature }}℃</p>
        <p>湿度 {{ point5?.humidity }}%</p>
      </div>
      <img :src="isNormal(point5.temperature, point5.humidity) ? sensorNormal : sensorWarning" alt="" />
    </div>
    <!-- 门磁 -->
    <div class="mark-wrap door-magnetic">
      <span>{{ doorMagneticPoint?.pointLocation }}</span>
      <img :src="doorMagneticPoint.close ? doorNormal : doorWarning" alt="" />
    </div>
    <!-- 烟雾传感器 -->
    <div class="mark-wrap smoke-sensor">
      <span>{{ smokeSensorPoint?.pointLocation }}</span>
      <img :src="smokeSensorPoint.noSmoke ? smokeNormal : smokeWarning" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import waterNormal from '@/assets/images/overview/water-location-normal.png'
import waterWarning from '@/assets/images/overview/water-location-warning.png'
import sensorNormal from '@/assets/images/overview/sensor-normal.png'
import sensorWarning from '@/assets/images/overview/sensor-warning.png'
import doorNormal from '@/assets/images/overview/door-normal.png'
import doorWarning from '@/assets/images/overview/door-warning.png'
import smokeNormal from '@/assets/images/overview/smoke-normal.png'
import smokeWarning from '@/assets/images/overview/smoke-warning.png'

const props = defineProps<{
  overviewData: any[]
  pointState: any[]
  doorMagnetic: any[]
  smokeSensor: any[]
}>()

const point1 = computed(() => props.overviewData.filter((item: any) => item.pointCode === '1')[0] || {})

const point2 = computed(() => props.overviewData.filter((item: any) => item.pointCode === '2')[0] || {})

const point3 = computed(() => props.overviewData.filter((item: any) => item.pointCode === '3')[0] || {})

const point4 = computed(() => props.overviewData.filter((item: any) => item.pointCode === '4')[0] || {})

const point5 = computed(() => props.overviewData.filter((item: any) => item.pointCode === '5')[0] || {})

const waterPoint1 = computed(() => props.pointState.filter((item: any) => item.pointCode === '1')[0] || {})

// 门磁
const doorMagneticPoint = computed(() => props.doorMagnetic.filter((item: any) => item.pointCode === '1')[0] || {})

// 烟雾传感器
const smokeSensorPoint = computed(() => props.smokeSensor.filter((item: any) => item.pointCode === '1')[0] || {})

/**
 * @desc 判断点位监测是否正常
 */
const isNormal = (temperature: number, humidity: number) => {
  if (temperature <= 5 || temperature >= 30 || humidity <= 20 || humidity >= 80) {
    return false
  } else {
    return true
  }
}
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
    top: 8%;
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
    top: 32.5%;
    left: 14.2%;
    .sensor-position;
  }

  .sensor-position-two {
    top: 39.2%;
    left: 27.2%;
    .sensor-position;
  }

  .sensor-position-three {
    top: 47.5%;
    left: 42.8%;
    .sensor-position;
  }

  .sensor-position-four {
    top: 11.6%;
    left: 66.5%;
    .sensor-position;
  }

  .sensor-position-five {
    top: 0.2%;
    left: 40.5%;
    .sensor-position;
  }

  .door-magnetic {
    position: absolute;
    top: 37%;
    left: 7.8%;

    img {
      width: 93px;
      height: 127px;
    }

    span {
      left: -100px;
    }

    .door-open {
      opacity: 0.6;
    }
  }

  .smoke-sensor {
    position: absolute;
    top: 18%;
    left: 50%;

    img {
      width: 77px;
      height: 279px;
    }

    span {
      left: -100px;
    }
  }
}
</style>
