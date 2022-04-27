<template>
  <div class="system-deploy-wrapper">
    <div class="title-wrap">系统部署</div>
    <div class="content-wrap">
      <div class="header-wrap">
        <span>系统名</span>
        <span class="status-wrap">状态</span>
        <span>主机数</span>
        <span>CPU核数</span>
        <span class="disk-total">磁盘</span>
      </div>
      <div class="table-body-wrap">
        <div class="item-wrap" v-for="(item, index) in tableData" :key="index">
          <span>{{ item.systemShortName }}</span>
          <span class="status-wrap">
            <span
              :style="{
                backgroundColor: item.systemStatus,
                display: 'inline-block',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
              }"
            ></span>
          </span>
          <span>{{ item.hostTotal }}</span>
          <span>{{ item.cpuCoresTotal }}</span>
          <span class="disk-total">{{ formatDisk(item.diskTotalGb) }}</span>
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

const formatDisk = (total: number) => {
  if (total > 1024) {
    return Math.floor((total * 100) / 1024) / 100 + 'TB'
  } else {
    return total + 'GB'
  }
}
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
    padding: 28px;
    background-image: url('../../assets/images/overview/info-background.png');
    background-repeat: no-repeat;
    background-size: 100% 98%;
    overflow: auto;

    .header-wrap {
      display: flex;
      height: 62px;
      line-height: 62px;
      border-bottom: 2px solid #0ca8d0;
      span {
        display: block;
        flex: 0.8;
        text-align: center;
        font-size: 32px;
      }
      .status-wrap {
        flex: 0.6 !important;
      }
      .disk-total {
        flex: 1.2 !important;
      }
      span:first-child {
        flex: 1.1;
        text-align: left;
      }
    }

    .table-body-wrap {
      height: 380px;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0;
      }

      .item-wrap {
        display: flex;
        height: 62px;
        line-height: 62px;
        span {
          display: block;
          flex: 0.8;
          text-align: center;
          font-size: 32px;
        }
        .status-wrap {
          flex: 0.6 !important;
        }
        .disk-total {
          flex: 1.2 !important;
        }
        span:first-child {
          flex: 1.1;
          text-align: left;
        }

        &:nth-of-type(even) {
          background-color: #0a1b47;
        }
      }
    }
  }
}
</style>
