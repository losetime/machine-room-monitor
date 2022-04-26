<template>
  <div class="overview-wrapper">
    <div class="header-wrap">
      <img src="@/assets/images/overview/header.png" alt="" />
      <div class="time-wrap">{{ realTime }}</div>
    </div>
    <div class="content-wrap">
      <div class="layout-left-wrap">
        <div class="overview-title-wrap">
          <p>机房总览</p>
          <img src="@/assets/images/overview/dotted-line.png" alt="" />
        </div>
        <config-info ref="configInfoInstance" />
        <disk-usage ref="diskUsageInstance" />
        <system-deploy ref="systemDeployInstance" />
      </div>
      <div class="layout-middle-wrap">
        <location-info
          :overviewData="monitorInfo?.temperatureHumidityList || []"
          :pointState="monitorInfo?.waterLoggingList || []"
          :doorMagnetic="monitorInfo?.doorSensorList || []"
          :smokeSensor="monitorInfo?.smokeSensorList || []"
        />
        <cpu-and-disk ref="cpuAndDiskInstance" />
      </div>
      <div class="layout-right-wrap">
        <div class="overview-title-wrap">
          <p>动环监控</p>
          <img src="@/assets/images/overview/dotted-line.png" alt="" />
        </div>
        <machine-room-power
          :overviewData="monitorInfo?.serverRoomPower || 0"
          :maxPower="monitorInfo?.serverRoomMaxPower || 0"
          :powerOn="monitorInfo?.powerOn"
        />
        <humiture-and-water
          :overviewData="monitorInfo?.temperatureHumidityList || []"
          :waterState="monitorInfo?.waterLoggingList || []"
          :doorMagnetic="monitorInfo?.doorSensorList || []"
          :smokeSensor="monitorInfo?.smokeSensorList || []"
        />
        <air-conditioning-state :overviewData="monitorInfo?.airConditionerList || []" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ConfigInfo from '@/components/overview/ConfigInfo.vue'
import DiskUsage from '@/components/overview/DiskUsage.vue'
import SystemDeploy from '@/components/overview/SystemDeploy.vue'
import MachineRoomPower from '@/components/overview/MachineRoomPower.vue'
import HumitureAndWater from '@/components/overview/HumitureAndWater.vue'
import AirConditioningState from '@/components/overview/AirConditioningState.vue'
import LocationInfo from '@/components/overview/LocationInfo.vue'
import CpuAndDisk from '@/components/overview/CPUAndDisk.vue'
import { apiGetMonitorOverviewInfo } from '@/service/api/overview'
import { dateUtil } from '@/utils/dateUtil'

const monitorInfo = ref()

const realTime = ref('')

const configInfoInstance = ref()
const diskUsageInstance = ref()
const systemDeployInstance = ref()
const cpuAndDiskInstance = ref()

onMounted(() => {
  getMonitorOverviewInfo()
  setDateTime()
  // 5分钟刷新数据
  setTimeout(() => {
    getMonitorOverviewInfo()
    configInfoInstance.value.getHostConfigInfo()
    diskUsageInstance.value.getHostConfigInfo()
    systemDeployInstance.value.getSystemDeploy()
    cpuAndDiskInstance.value.loadInfo()
  }, 1000 * 60 * 5)
})

const getMonitorOverviewInfo = async () => {
  const { code, data } = await apiGetMonitorOverviewInfo()
  if (code === 20000) {
    monitorInfo.value = data
  }
}

const formatWeek = (week: string) => {
  switch (week) {
    case '0':
      return '星期天'
    case '1':
      return '星期一'
    case '2':
      return '星期二'
    case '3':
      return '星期三'
    case '4':
      return '星期四'
    case '5':
      return '星期五'
    case '6':
      return '星期六'
    default:
      return ''
  }
}

/**
 * @desc 生成时间
 */
const setDateTime = () => {
  const date: string[] = dateUtil().format('YYYY-MM-DD d HH:mm:ss').split(' ')
  date.splice(1, 1, formatWeek(date[1]))
  realTime.value = date.join(' ')
  window.requestAnimationFrame(setDateTime)
}
</script>

<style lang="less" scoped>
.overview-wrapper {
  width: 3840px;
  height: 100vh;
  overflow: auto;
  background-image: url('../../assets/images/overview/overview-bg.png');
  background-repeat: no-repeat;
  background-size: cover;

  .header-wrap {
    height: 224px;
    position: relative;

    img {
      width: 100%;
    }

    .time-wrap {
      position: absolute;
      top: 16px;
      right: 60px;
      font-size: 50px;
      color: #ffffff;
    }
  }

  .content-wrap {
    display: flex;
    justify-content: space-between;
    padding: 0 58px;
    box-sizing: border-box;

    .layout-left-wrap,
    .layout-right-wrap {
      width: 844px;

      .overview-title-wrap {
        p {
          margin: 0;
          font-size: 80px;
          font-weight: bold;
          line-height: 110px;
          color: #01e7fb;
          background-image: linear-gradient(to right bottom, #05a7e6, #00f5ff);
          -webkit-background-clip: text;
          color: transparent;
        }

        img {
          width: 100%;
        }
      }
    }

    .layout-middle-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>
