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
    <div class="crate-1-wrap"><img src="@/assets/images/overview/crate-1-blue.png" alt="" /></div>
    <div class="crate-2-wrap"><img :src="iot" alt="" /></div>
    <div class="crate-3-wrap"><img :src="dataPlatform1" alt="" /></div>
    <div class="crate-4-wrap"><img :src="dataPlatform2" alt="" /></div>
    <div class="crate-5-wrap"><img :src="devOps" alt="" /></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { apiGetSystemDeploy } from '@/service/api/overview'
import waterNormal from '@/assets/images/overview/water-location-normal.png'
import waterWarning from '@/assets/images/overview/water-location-warning.png'
import sensorNormal from '@/assets/images/overview/sensor-normal.png'
import sensorWarning from '@/assets/images/overview/sensor-warning.png'
import doorNormal from '@/assets/images/overview/door-normal.png'
import doorWarning from '@/assets/images/overview/door-warning.png'
import smokeNormal from '@/assets/images/overview/smoke-normal.png'
import smokeWarning from '@/assets/images/overview/smoke-warning.png'

import crate2Blue from '@/assets/images/overview/crate-2-blue.png'
import crate2Yellow from '@/assets/images/overview/crate-2-yellow.png'
import crate2Red from '@/assets/images/overview/crate-2-red.png'

import crate3Blue from '@/assets/images/overview/crate-3-blue.png'
import crate3Yellow from '@/assets/images/overview/crate-3-yellow.png'
import crate3Red from '@/assets/images/overview/crate-3-red.png'

import crate4Blue from '@/assets/images/overview/crate-4-blue.png'
import crate4Yellow from '@/assets/images/overview/crate-4-yellow.png'
import crate4Red from '@/assets/images/overview/crate-4-red.png'

import crate5Blue from '@/assets/images/overview/crate-5-blue.png'
import crate5Yellow from '@/assets/images/overview/crate-5-yellow.png'
import crate5Red from '@/assets/images/overview/crate-5-red.png'

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

// 物管平台&&配网监测
const iot = computed(() => {
  const result = tableData.value.filter(
    (item: any) => item.systemCode === 'iot' || item.systemCode === 'distribution_network',
  )
  if (result.length > 0) {
    if (result[0]?.systemStatus === 'red' || result[1]?.systemStatus === 'red') {
      return crate2Red
    } else if (result[0]?.systemStatus === 'yellow' || result[1]?.systemStatus === 'yellow') {
      return crate2Yellow
    } else {
      return crate2Blue
    }
  } else {
    return crate2Blue
  }
})

// 数据中台
const dataPlatform1 = computed(() => {
  const result = tableData.value.filter((item: any) => item.systemCode === 'data_platform')
  if (result.length > 0) {
    switch (result[0].systemStatus) {
      case 'red':
        return crate3Red
      case 'yellow':
        return crate3Yellow
      case 'green':
        return crate3Blue
      default:
        return crate3Blue
    }
  } else {
    return crate3Blue
  }
})

// 数据中台
const dataPlatform2 = computed(() => {
  const result = tableData.value.filter((item: any) => item.systemCode === 'data_platform')
  if (result.length > 0) {
    switch (result[0].systemStatus) {
      case 'red':
        return crate4Red
      case 'yellow':
        return crate4Yellow
      case 'green':
        return crate4Blue
      default:
        return crate4Blue
    }
  } else {
    return crate4Blue
  }
})

// 指挥中心&&运维监控
const devOps = computed(() => {
  const result = tableData.value.filter(
    (item: any) => item.systemCode === 'command_center' || item.systemCode === 'cvit_monitor',
  )
  if (result.length > 0) {
    if (result[0]?.systemStatus === 'red' || result[1]?.systemStatus === 'red') {
      return crate5Red
    } else if (result[0]?.systemStatus === 'yellow' || result[1]?.systemStatus === 'yellow') {
      return crate5Yellow
    } else {
      return crate5Blue
    }
  } else {
    return crate5Blue
  }
})

const tableData = ref<any[]>([])

onMounted(() => {
  getSystemDeploy()
})

const getSystemDeploy = async () => {
  const { code, data } = await apiGetSystemDeploy()
  if (code === 20000) {
    tableData.value = data
  }
}

/**
 * @desc 判断点位监测是否正常
 */
const isNormal = (temperature: number, humidity: number) => {
  if (temperature <= 5 || temperature >= 30 || humidity >= 80) {
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

  .crate-1-wrap {
    position: absolute;
    top: 619px;
    right: 673px;
    z-index: 102;

    img {
      width: 95px;
    }
  }

  .crate-2-wrap {
    position: absolute;
    top: 547px;
    right: 708px;
    z-index: 101;

    img {
      width: 157px;
    }
  }

  .crate-3-wrap {
    position: absolute;
    top: 525px;
    left: 987px;
    z-index: 100;

    img {
      width: 155px;
    }
  }

  .crate-4-wrap {
    position: absolute;
    top: 506px;
    left: 921px;
    z-index: 99;

    img {
      width: 155px;
    }
  }

  .crate-5-wrap {
    position: absolute;
    top: 485px;
    left: 855px;

    img {
      width: 155px;
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
    z-index: 105;
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
