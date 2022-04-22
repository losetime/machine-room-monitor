<template>
  <div class="system-deploy-wrapper">
    <div class="title-wrap">温湿度&水浸</div>
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
        <div class="alarm-item-wrap" v-for="(item, index) in pointState" :key="index">
          <div class="icon-wrap">
            <img :src="item.normal ? normalStatus : alarmStatus" alt="点位" />
            <p>{{ item.pointLocation }}</p>
          </div>
          <span>{{ item.normal ? '正常' : '告警' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import normalStatus from '@/assets/images/overview/water-normal.png'
import alarmStatus from '@/assets/images/overview/water-warning.png'
// import { ref } from 'vue'
defineProps<{
  overviewData: any[]
  pointState: any[]
}>()

// const tableData = ref([])
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
        justify-content: center;
        margin-top: 57px;
        &:first-child {
          margin-top: 50px;
        }
        .icon-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 26px;
          img {
            width: 76px;
            height: 96px;
          }
          p {
            margin: 12px 0 0 0;
            font-size: 32px;
          }
        }
        span {
          font-size: 70px;
          font-weight: bold;
          color: #03edfc;
          margin-top: -50px;
        }
      }
    }
  }
}
</style>
