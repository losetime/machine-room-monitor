<template>
  <div class="cpu-and-disk-wrapper">
    <div class="title-wrap">应用系统CPU&内存</div>
    <div class="content-wrap">
      <div class="cpu-usage-wrap">
        <div class="title-text">CPU占用</div>
        <Line
          :xAxis="cpuUsage?.xAxis || []"
          :yAxis="cpuUsage?.yAxis || []"
          :series="cpuUsage?.series || []"
          :domId="'cpu-usage'"
          ref="cpuLineInstance"
        />
      </div>
      <div class="disk-usage-wrap">
        <div class="title-text">内存占用</div>
        <Line
          :xAxis="diskUsage?.xAxis || []"
          :yAxis="diskUsage?.yAxis || []"
          :series="diskUsage?.series || []"
          :domId="'disk-usage'"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Line from '@/components/charts/Line.vue'
import * as echarts from 'echarts'
import { apiGetCpuUsageInfo, apiGetMemoryUsageInfo } from '@/service/api/overview'

const cpuUsage = ref()

const cpuUsageSource = ref<any[]>([])

const diskUsage = ref()

const diskUsageSource = ref<any[]>([])

const systemCode = ['data_platform,iot', 'digital_twin,command_center,distribution_network,cvit_monitor']

const currenIndex = ref(0)

const chartStep = 3600

const interval = ref<any>(0)

const cpuLineInstance = ref<any>(null)

onMounted(() => {
  loadInfo()
})

const loadInfo = () => {
  clearInterval(interval.value)
  systemCode.forEach((item: string, index: number) => {
    getCpuUsageInfo(item, index)
    getMemoryUsageInfo(item, index)
  })
  interval.value = setInterval(() => {
    currenIndex.value = currenIndex.value === 0 ? 1 : 0
    cpuUsage.value = cpuUsageSource.value[currenIndex.value]
    diskUsage.value = diskUsageSource.value[currenIndex.value]
  }, 1000 * 5)
}

/**
 * @desc 当日系统主机CPU占用情况
 */
const getCpuUsageInfo = async (systemCode: string, codeIndex: number) => {
  const { code, data } = await apiGetCpuUsageInfo({
    systemCodeList: systemCode,
    windowSec: chartStep,
  })
  if (code === 20000) {
    let series: any[] = []
    let xAxis: string[] = []
    for (let [index, item] of data.entries()) {
      // 过滤掉数据为空的主机
      const itemTemp = item.hostUsedRateList.filter((filterItem: any) => filterItem.windowTime2UsedRateList.length > 0)
      // 处理原始数据
      const seriesTemp = itemTemp.map((mapItem: any, mapIndex: number) => {
        // 生成X轴数据
        if (xAxis.length <= 0 && mapItem.windowTime2UsedRateList.length > 0) {
          xAxis = mapItem.windowTime2UsedRateList.map((val: any) => val.key.split(' ')[1])
        }
        return {
          name: item.systemShortName + (mapIndex + 1),
          data: mapItem.windowTime2UsedRateList.map((val: any) => parseFloat(val.value)),
          type: 'line',
          showSymbol: false,
          itemStyle: {
            color: `rgb(${formatColor(index, mapIndex, data)})`,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: `rgba(${formatColor(index, mapIndex, data)}, 0.6)`,
              },
              {
                offset: 1,
                color: `rgba(${formatColor(index, mapIndex, data)}, 0.1)`,
              },
            ]),
          },
        }
      })
      series = series.concat(seriesTemp)
    }
    if (codeIndex === 0) {
      cpuUsage.value = {
        xAxis,
        series,
      }
    }
    cpuUsageSource.value[codeIndex] = {
      xAxis,
      series,
    }
  }
}

/**
 * @desc 当日系统主机内存占用情况
 */
const getMemoryUsageInfo = async (systemCode: string, codeIndex: number) => {
  const { code, data } = await apiGetMemoryUsageInfo({
    systemCodeList: systemCode,
    windowSec: chartStep,
  })
  if (code === 20000) {
    let series: any[] = []
    let xAxis: string[] = []
    for (let [index, item] of data.entries()) {
      // 过滤掉数据为空的主机
      const itemTemp = item.hostUsedRateList.filter((filterItem: any) => filterItem.windowTime2UsedRateList.length > 0)
      // 处理原始数据
      const seriesTemp = itemTemp.map((mapItem: any, mapIndex: number) => {
        // 生成X轴数据
        if (xAxis.length <= 0 && mapItem.windowTime2UsedRateList.length > 0) {
          xAxis = mapItem.windowTime2UsedRateList.map((val: any) => val.key.split(' ')[1])
        }
        return {
          name: item.systemShortName + (mapIndex + 1),
          data: mapItem.windowTime2UsedRateList.map((val: any) => parseFloat(val.value)),
          type: 'line',
          showSymbol: false,
          itemStyle: {
            color: `rgb(${formatColor(index, mapIndex, data)})`,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: `rgba(${formatColor(index, mapIndex, data)}, 0.6)`,
              },
              {
                offset: 1,
                color: `rgba(${formatColor(index, mapIndex, data)}, 0.1)`,
              },
            ]),
          },
        }
      })
      series = series.concat(seriesTemp)
    }
    if (codeIndex === 0) {
      diskUsage.value = {
        xAxis,
        series,
      }
    }
    diskUsageSource.value[codeIndex] = {
      xAxis,
      series,
    }
  }
}

/**
 * @desc 处理颜色
 */
const formatColor = (oneLevelIndex: number, twoLevelIndex: number, data: any) => {
  const rgbColors = [
    '107,184,144',
    '231,139,49',
    '50,166,245',
    '26,61,148',
    '136,51,235',
    '47,194,91',
    '0,192,228',
    '121,88,240',
    '129,165,139',
    '236,208,128',
    '178,210,186',
    '55,139,133',
    '213,127,127',
    '230,221,196',
    '240,233,210',
    '153,140,235',
    '255,230,83',
    '236,179,144',
  ]
  if (oneLevelIndex === 0) {
    return rgbColors[twoLevelIndex]
  } else {
    let len = 0
    for (let i = 0; i < oneLevelIndex; i++) {
      len += data[i].hostUsedRateList.length
    }
    return rgbColors[len + twoLevelIndex]
  }
}
</script>

<style lang="less" scoped>
.cpu-and-disk-wrapper {
  width: 100%;
  padding: 0 28px;

  .title-wrap {
    height: 80px;
    line-height: 80px;
    font-size: 50px;
    font-weight: bold;
    color: #00b0e7;
  }

  .content-wrap {
    height: 505px;
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
      height: 450px;
      margin-top: 20px;

      .title-text {
        position: absolute;
        top: -5px;
        left: 28px;
        font-size: 30px;
        color: #ffffff;
      }
    }
  }
}
</style>
