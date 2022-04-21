<template>
  <div class="system-deploy-wrapper">
    <div class="title-wrap">系统部署</div>
    <div class="content-wrap">
      <div class="header-wrap">
        <span>系统名</span>
        <span>主机数</span>
        <span>CPU核数</span>
        <span>磁盘</span>
      </div>
      <div class="table-body-wrap">
        <div class="item-wrap" v-for="(item, index) in tableData" :key="index">
          <span>{{ item.systemName }}</span>
          <span>{{ item.hostTotal }}</span>
          <span>{{ item.cpuCoresTotal }}</span>
          <span>{{ item.diskTotalGb }}GB</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiGetSystemDeploy } from '@/service/api/overview'

const tableData = ref<any[]>([])

onMounted(() => {
  getSystemDeploy()
})

const getSystemDeploy = async () => {
  const { code, data } = await apiGetSystemDeploy()
  if (code === 20000) {
    tableData.value = data
  }
}
</script>

<style lang="less" scoped>
.system-deploy-wrapper {
  width: 422px;
  margin-top: 8px;
  color: #ffffff;

  .title-wrap {
    font-size: 18px;
    font-weight: bold;
    color: #00b0e7;
  }

  .content-wrap {
    height: 220px;
    padding: 28px 14px;
    background-image: url('../../assets/images/overview/info-background.png');
    background-repeat: no-repeat;
    background-size: 100% 98%;
    overflow: auto;

    .header-wrap {
      border-bottom: 2px solid #0ca8d0;
      span {
        display: inline-block;
        width: 20%;
      }

      span:first-child {
        width: 40%;
      }
    }

    .table-body-wrap {
      height: 140px;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0;
      }

      .item-wrap {
        height: 30px;
        line-height: 30px;
        span {
          display: inline-block;
          width: 20%;
        }

        span:first-child {
          width: 40%;
        }

        &:nth-of-type(even) {
          background-color: #0a1b47;
        }
      }
    }
  }
}
</style>
