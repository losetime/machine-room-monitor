<template>
  <div class="machine-room-power-wrapper">
    <div class="title-wrap">机房功率</div>
    <div class="content-wrap">
      <div class="chart-wrap">
        <Gauge :series="machineRoomPower?.series || []" domId="machine-room-power" />
      </div>
      <div class="tip-wrap">机房功率</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Gauge from '@/components/charts/Gauge.vue'
import * as echarts from 'echarts'

const machineRoomPower = ref()

onMounted(() => {
  machineRoomPower.value = {
    series: [
      {
        type: 'gauge',
        radius: '90%',
        center: ['50%', '60%'],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 5000,
        splitNumber: 10,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgb(0,232,254)',
            },
            {
              offset: 1,
              color: 'rgb(1,54,115)',
            },
          ]),
        },
        progress: {
          show: true,
          roundCap: true,
          width: 10,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 10,
            color: [[1, '#013877']],
          },
        },
        axisTick: {
          distance: 2,
          lineStyle: {
            width: 1,
            color: '#00E8FE',
          },
        },
        splitLine: {
          show: false,
          distance: -10,
          length: 14,
          lineStyle: {
            width: 10,
            color: '#999',
          },
        },
        axisLabel: {
          show: false,
          distance: -20,
          color: '#999',
          fontSize: 12,
        },
        anchor: {
          show: false,
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          width: '50%',
          borderRadius: 8,
          offsetCenter: [0, '-10%'],
          fontSize: 20,
          fontWeight: 'bolder',
          formatter: '{value}W',
          color: '#03EDFC',
        },
        data: [
          {
            value: 2879,
          },
        ],
      },
    ],
  }
})
</script>

<style lang="less" scoped>
.machine-room-power-wrapper {
  width: 422px;
  color: #ffffff;

  .title-wrap {
    font-size: 18px;
    font-weight: bold;
    color: #00b0e7;
  }

  .content-wrap {
    height: 220px;
    padding: 0 14px;
    background-image: url('../../assets/images/overview/info-background.png');
    background-repeat: no-repeat;
    background-size: 100% 98%;
    overflow: auto;
    position: relative;
    .chart-wrap {
      width: 100%;
      height: 200px;
    }
    .tip-wrap {
      position: absolute;
      top: 72%;
      left: 38%;
      width: 120px;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
      &::after {
        content: '';
        display: block;
        width: 120px;
        height: 10px;
        background-image: linear-gradient(#03ebfa, #0863d3);
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        margin-top: 2px;
      }
    }
  }
}
</style>
