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
import { ref, watchEffect } from 'vue'
import Gauge from '@/components/charts/Gauge.vue'
import * as echarts from 'echarts'

const props = defineProps<{
  overviewData: number
  maxPower: number
}>()

const machineRoomPower = ref()

watchEffect(() => {
  machineRoomPower.value = {
    series: [
      {
        type: 'gauge',
        radius: '100%',
        center: ['50%', '65%'],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: props.maxPower,
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
          width: 40,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 40,
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
          fontSize: 70,
          fontWeight: 'bolder',
          formatter: '{value}W',
          color: '#03EDFC',
        },
        data: [
          {
            value: props.overviewData,
          },
        ],
      },
    ],
  }
})
</script>

<style lang="less" scoped>
.machine-room-power-wrapper {
  width: 844px;
  color: #ffffff;

  .title-wrap {
    height: 80px;
    line-height: 80px;
    font-size: 50px;
    font-weight: bold;
    color: #00b0e7;
  }

  .content-wrap {
    height: 505px;
    padding: 0 14px;
    background-image: url('../../assets/images/overview/info-background.png');
    background-repeat: no-repeat;
    background-size: 100% 98%;
    overflow: auto;
    position: relative;
    .chart-wrap {
      width: 100%;
      height: 420px;
    }
    .tip-wrap {
      width: 238px;
      text-align: center;
      font-size: 40px;
      font-weight: bold;
      position: absolute;
      left: 37%;
      top: 72%;
      &::after {
        content: '';
        display: block;
        width: 238px;
        height: 15px;
        background-image: linear-gradient(#03ebfa, #0863d3);
        border-top-left-radius: 15px;
        border-top-right-radius: 15px;
        margin-top: 5px;
      }
    }
  }
}
</style>
