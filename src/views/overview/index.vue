<template>
  <div class="overview-wrapper">
    <div class="header-wrap">
      <img src="@/assets/images/overview/header.png" alt="" />
    </div>
    <div class="content-wrap">
      <div class="layout-left-wrap">
        <div class="overview-title-wrap">
          <p>机房总览</p>
          <img src="@/assets/images/overview/dotted-line.png" alt="" />
        </div>
        <config-info />
        <disk-usage />
        <system-deploy />
      </div>
      <div class="layout-middle-wrap">
        <location-info />
        <cpu-and-disk />
      </div>
      <div class="layout-right-wrap">
        <div class="overview-title-wrap">
          <p>动环监控</p>
          <img src="@/assets/images/overview/dotted-line.png" alt="" />
        </div>
        <machine-room-power />
        <humiture />
        <air-conditioning-state />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import ConfigInfo from '@/components/overview/ConfigInfo.vue'
import DiskUsage from '@/components/overview/DiskUsage.vue'
import SystemDeploy from '@/components/overview/SystemDeploy.vue'
import MachineRoomPower from '@/components/overview/MachineRoomPower.vue'
import Humiture from '@/components/overview/Humiture.vue'
import AirConditioningState from '@/components/overview/AirConditioningState.vue'
import LocationInfo from '@/components/overview/LocationInfo.vue'
import CpuAndDisk from '@/components/overview/CpuAndDisk.vue'
</script>

<style lang="less" scoped>
.overview-wrapper {
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-image: url('../../assets/images/overview/overview-bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  .content-wrap {
    display: flex;
    justify-content: space-between;
    padding: 14px 28px;
    .layout-left-wrap,
    .layout-right-wrap {
      width: 422px;
      .overview-title-wrap {
        p {
          margin: 0;
          font-size: 20px;
          font-weight: bold;
          color: #01e7fb;
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
    }
  }
}
</style>
