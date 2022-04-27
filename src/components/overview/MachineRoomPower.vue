<template>
  <div class="machine-room-power-wrapper">
    <div class="title-wrap">动力监测</div>
    <div class="content-wrap">
      <div class="layout-left-wrap">
        <div class="chart-wrap">
          <Gauge :series="machineRoomPower?.series || []" domId="machine-room-power" />
        </div>
        <div class="tip-wrap">机房功率</div>
      </div>
      <div class="layout-right-wrap">
        <div class="chart-wrap">
          <img :src="powerOn ? powerSupplyNormal : powerSupplyWarning" alt="" />
          <span class="power-supply-text" :style="{ color: powerOn ? '#03EDFC' : '#EF3403' }">
            {{ powerOn ? '正常' : '断电' }}
          </span>
        </div>
        <div class="tip-wrap">供电状态</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import Gauge from '@/components/charts/Gauge.vue'
import * as echarts from 'echarts'
import powerSupplyNormal from '@/assets/images/overview/power-supply-normal.png'
import powerSupplyWarning from '@/assets/images/overview/power-supply-warning.png'

const props = defineProps<{
  overviewData: number
  maxPower: number
  powerOn: boolean
}>()

const machineRoomPower = ref()

watchEffect(() => {
  machineRoomPower.value = {
    series: [
      {
        type: 'gauge',
        radius: '75%',
        center: ['50%', '62%'],
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: props.maxPower / 1000,
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
          width: 30,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 30,
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
          fontSize: 56,
          fontWeight: 'bolder',
          formatter: '{value}kW',
          color: '#03EDFC',
        },
        data: [
          {
            value: Math.ceil(props.overviewData / 1000),
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
    display: flex;
    justify-content: space-between;
    background-image: url('../../assets/images/overview/info-background.png');
    background-repeat: no-repeat;
    background-size: 100% 98%;
    overflow: auto;

    .layout-left-wrap {
      flex: 1;
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
        left: 25%;
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

    .layout-right-wrap {
      flex: 1;
      position: relative;

      .chart-wrap {
        width: 236px;
        height: 236px;
        margin: 100px 0 0 98px;
        position: relative;
        .power-supply-text {
          position: absolute;
          top: 100px;
          left: 64px;
          font-size: 56px;
          font-weight: bold;
        }

        img {
          width: 100%;
          height: 100%;
        }
      }

      .tip-wrap {
        width: 238px;
        text-align: center;
        font-size: 40px;
        font-weight: bold;
        position: absolute;
        left: 25%;
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
}
</style>
