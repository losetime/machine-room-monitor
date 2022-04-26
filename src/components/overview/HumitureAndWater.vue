<template>
  <div class="system-deploy-wrapper">
    <div class="title-wrap">环境监测</div>
    <div class="content-wrap">
      <div class="table-wrap">
        <div class="header-wrap">
          <span>点位</span>
          <span>温度</span>
          <span>湿度</span>
        </div>
        <div class="table-body-wrap">
          <div class="item-wrap" v-for="(item, index) in overviewData" :key="index">
            <span>{{ item.pointLocation }}</span>
            <span>{{ item.temperature }}℃</span>
            <span>{{ item.humidity }}%</span>
          </div>
        </div>
      </div>
      <div class="alarm-info-wrap">
        <!-- 水浸 -->
        <div class="alarm-item-wrap">
          <p>{{ waterState[0]?.pointLocation }}</p>
          <img :src="waterState[0]?.normal ? normalStatus : alarmStatus" alt="点位" />
          <span v-if="waterState[0]?.normal">正常</span>
          <span v-else style="color: #ef3403">告警</span>
        </div>
        <!-- 门磁 -->
        <div class="alarm-item-wrap">
          <p>{{ doorMagnetic[0]?.pointLocation }}</p>
          <img :src="doorMagnetic[0]?.close ? doorMagneticNormal : doorMagneticWarning" alt="点位" />
          <span v-if="doorMagnetic[0]?.close">关闭</span>
          <span v-else style="color: #ef3403">开启</span>
        </div>
        <!-- 烟雾传感器 -->
        <div class="alarm-item-wrap">
          <p>{{ smokeSensor[0]?.pointLocation }}</p>
          <img :src="smokeSensor[0]?.noSmoke ? smokeNormal : smokeWarning" alt="点位" />
          <span v-if="smokeSensor[0]?.noSmoke">正常</span>
          <span v-else style="color: #ef3403">告警</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import normalStatus from '@/assets/images/overview/water-normal.png'
import alarmStatus from '@/assets/images/overview/water-warning.png'
import doorMagneticNormal from '@/assets/images/overview/door-magnetic-mormal.png'
import doorMagneticWarning from '@/assets/images/overview/door-magnetic-warning.png'
import smokeNormal from '@/assets/images/overview/smoke-icon-normal.png'
import smokeWarning from '@/assets/images/overview/smoke-icon-warning.png'

defineProps<{
  overviewData: any[]
  waterState: any[]
  doorMagnetic: any[]
  smokeSensor: any[]
}>()
</script>

<style lang="less" scoped>
.system-deploy-wrapper {
  width: 844px;
  margin-top: 8px;
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
    display: flex;
    padding: 28px 14px;
    background-image: url('../../assets/images/overview/info-background.png');
    background-repeat: no-repeat;
    background-size: 100% 98%;
    overflow: auto;

    .table-wrap {
      width: 50%;
      margin-top: 10px;
      .header-wrap {
        border-bottom: 2px solid #0ca8d0;
        span {
          display: inline-block;
          width: 33%;
          text-align: center;
          font-size: 32px;
        }
      }

      .table-body-wrap {
        height: 390px;
        overflow: auto;
        &::-webkit-scrollbar {
          width: 0;
        }
        .item-wrap {
          height: 78px;
          line-height: 78px;

          span {
            display: inline-block;
            width: 33%;
            text-align: center;
            font-size: 30px;
          }

          &:nth-of-type(even) {
            background-color: #0a1b47;
          }
        }
      }
    }
    .alarm-info-wrap {
      width: 50%;
      height: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0;
      }
      .alarm-item-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 95%;
        height: 110px;
        padding: 0 28px;
        margin: 30px 0 0 14px;
        background-color: rgba(36, 86, 167, 0.2);
        border: 2px solid rgba(36, 86, 167, 1);

        p {
          width: 105px;
          font-size: 32px;
          margin: 0;
        }

        img {
          width: 60px;
          height: 74px;
        }
        span {
          font-size: 56px;
          font-weight: bold;
          color: #03edfc;
        }
      }
    }
  }
}
</style>
