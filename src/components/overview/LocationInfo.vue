<template>
  <div class="location-info-wrapper">
    <div class="mark-wrap water-position-one">
      <span>水浸1</span>
      <img src="@/assets/images/overview/water-location-normal.png" alt="水浸-正常" />
    </div>
    <div class="mark-wrap water-position-two">
      <span>水浸1</span>
      <img src="@/assets/images/overview/water-location-warning.png" alt="水浸-告警" />
    </div>
    <div class="mark-wrap sensor-position-one">
      <span>{{ point1?.pointLocation }}</span>
      <div class="info-wrap">
        <p>温度 {{ point1?.temperature }}℃</p>
        <p>湿度 {{ point1?.humidity }}%</p>
      </div>
      <img src="@/assets/images/overview/sensor-normal.png" alt="水浸-告警" />
    </div>
    <div class="mark-wrap sensor-position-two">
      <span>{{ point2?.pointLocation }}</span>
      <div class="info-wrap">
        <p>温度 {{ point2?.temperature }}℃</p>
        <p>湿度 {{ point2?.humidity }}%</p>
      </div>
      <img src="@/assets/images/overview/sensor-normal.png" alt="水浸-告警" />
    </div>
    <div class="mark-wrap sensor-position-three">
      <span>{{ point3?.pointLocation }}</span>
      <div class="info-wrap">
        <p>温度 {{ point3?.temperature }}℃</p>
        <p>湿度 {{ point3?.humidity }}%</p>
      </div>
      <img src="@/assets/images/overview/sensor-warning.png" alt="水浸-告警" />
    </div>
    <div class="mark-wrap sensor-position-four">
      <span>{{ point4?.pointLocation }}</span>
      <div class="info-wrap">
        <p>温度 {{ point4?.temperature }}℃</p>
        <p>湿度 {{ point4?.humidity }}%</p>
      </div>
      <img src="@/assets/images/overview/sensor-normal.png" alt="水浸-告警" />
    </div>
    <div class="mark-wrap sensor-position-five">
      <span>{{ point5?.pointLocation }}</span>
      <div class="info-wrap">
        <p>温度 {{ point5?.temperature }}℃</p>
        <p>湿度 {{ point5?.humidity }}%</p>
      </div>
      <img src="@/assets/images/overview/sensor-normal.png" alt="水浸-告警" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  overviewData: any[]
}>()

const point1 = computed(() => props.overviewData.filter((item: any) => item.pointCode === '1')[0])

const point2 = computed(() => props.overviewData.filter((item: any) => item.pointCode === '2')[0])

const point3 = computed(() => props.overviewData.filter((item: any) => item.pointCode === '3')[0])

const point4 = computed(() => props.overviewData.filter((item: any) => item.pointCode === '4')[0])

const point5 = computed(() => props.overviewData.filter((item: any) => item.pointCode === '5')[0])
</script>

<style lang="less" scoped>
.sensor-position {
  position: absolute;
  img {
    width: 100px;
  }
  .info-wrap {
    position: absolute;
    top: 5px;
    left: 10px;
    p {
      margin: 0;
      color: #ffffff;
    }
  }
}

.location-info-wrapper {
  width: 100%;
  flex: 1;
  margin-top: 50px;
  background-image: url('../../assets/images/overview/location.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50% 20%;
  position: relative;
  .mark-wrap {
    span {
      display: inline-block;
      width: 100%;
      text-align: center;
      position: absolute;
      top: -25px;
      left: 2px;
      color: #ffffff;
    }
  }
  .water-position-one {
    position: absolute;
    top: 148px;
    right: 146px;
    img {
      width: 40px;
    }
  }
  .water-position-two {
    position: absolute;
    top: 27px;
    left: 355px;
    img {
      width: 40px;
    }
  }

  .sensor-position-one {
    top: 138px;
    left: 218px;
    .sensor-position;
  }
  .sensor-position-two {
    top: 179px;
    left: 340px;
    .sensor-position;
  }
  .sensor-position-three {
    top: 224px;
    left: 466px;
    .sensor-position;
  }
  .sensor-position-four {
    top: 26px;
    left: 642px;
    .sensor-position;
  }
  .sensor-position-five {
    top: -36px;
    left: 428px;
    .sensor-position;
  }
}
</style>
