<template>
  <div class="cpu-and-disk-wrapper">
    <div class="title-wrap">CPU&内存</div>
    <div class="content-wrap">
      <div class="cpu-usage-wrap">
        <Line
          :xAxis="cpuUsage?.xAxis || []"
          :yAxis="cpuUsage?.yAxis || []"
          :series="cpuUsage?.series || []"
          domId="cpu-usage"
        />
        <div class="tip-wrap">主机CPU占用TOP5</div>
      </div>
      <div class="disk-usage-wrap">
        <Line
          :xAxis="diskUsage?.xAxis || []"
          :yAxis="diskUsage?.yAxis || []"
          :series="diskUsage?.series || []"
          domId="disk-usage"
        />
        <div class="tip-wrap">主机内存占用TOP5</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Line from '@/components/charts/Line.vue'
import * as echarts from 'echarts'
import { apiGetCpuUsageTop5, apiGetMemoryUsageTop5 } from '@/service/api/overview'

const cpuUsage = ref()

const diskUsage = ref()

const rgbColors = ['107,184,144', '231,139,49', '50,166,245', '26,61,148', '136,51,235']

onMounted(() => {
  getCpuUsageTop5()
  getMemoryUsageTop5()
})

const getCpuUsageTop5 = async () => {
  const { code, data } = await apiGetCpuUsageTop5({
    topN: 5,
    recentDays: 7,
  })
  if (code === 20000) {
    let xAxis: string[] = []
    const series = data.map((item: any, index: number) => {
      if (index === 0) {
        xAxis = item.dayAvgUsedRates.map((val: any) => val.day.split(' ')[0])
      }
      return {
        name: item.hostIp,
        data: item.dayAvgUsedRates.map((val: any) => parseFloat(val.usedRate)),
        type: 'line',
        showSymbol: false,
        itemStyle: {
          color: `rgb(${rgbColors[index]})`,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: `rgba(${rgbColors[index]}, 0.8)`,
            },
            {
              offset: 1,
              color: `rgba(${rgbColors[index]}, 0.2)`,
            },
          ]),
        },
      }
    })
    cpuUsage.value = {
      xAxis,
      series,
    }
  }
}

const getMemoryUsageTop5 = async () => {
  const { code, data } = await apiGetMemoryUsageTop5({
    topN: 5,
    recentDays: 7,
  })
  if (code === 20000) {
    let xAxis: string[] = []
    const series = data.map((item: any, index: number) => {
      if (index === 0) {
        xAxis = item.dayAvgUsedRates.map((val: any) => val.day.split(' ')[0])
      }
      return {
        name: item.hostIp,
        data: item.dayAvgUsedRates.map((val: any) => val.usedRate),
        type: 'line',
        showSymbol: false,
        itemStyle: {
          color: `rgb(${rgbColors[index]})`,
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: `rgba(${rgbColors[index]}, 0.8)`,
            },
            {
              offset: 1,
              color: `rgba(${rgbColors[index]}, 0.2)`,
            },
          ]),
        },
      }
    })
    diskUsage.value = {
      xAxis,
      series,
    }
  }
}
</script>

<style lang="less" scoped>
.cpu-and-disk-wrapper {
  width: 100%;
  padding: 0 28px;
  .title-wrap {
    font-size: 18px;
    font-weight: bold;
    color: #00b0e7;
  }
  .content-wrap {
    height: 220px;
    display: flex;
    justify-content: space-between;
    padding: 14px 14px;
    background-image: url('../../assets/images/overview/cpu-and-disk.png');
    background-repeat: no-repeat;
    background-size: 100% 98%;
    overflow: auto;
    .cpu-usage-wrap,
    .disk-usage-wrap {
      position: relative;
      width: 48%;
      height: 170px;
      .tip-wrap {
        color: #ffffff;
        position: absolute;
        bottom: -25px;
        left: 40%;
      }
    }
  }
}
</style>
