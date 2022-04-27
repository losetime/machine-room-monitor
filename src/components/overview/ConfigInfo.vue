<template>
  <div class="config-info-wrapper">
    <div class="title-wrap">配置情况</div>
    <div class="content-wrap">
      <div class="row-wrap">
        <div class="item-wrap">
          <img src="@/assets/images/overview/host.png" alt="" />
          <div class="info-wrap">
            <p>主机总数</p>
            <p>
              <span>{{ state.hostTotal }}</span
              >台
            </p>
          </div>
        </div>
        <div class="item-wrap">
          <img src="@/assets/images/overview/cpu.png" alt="" />
          <div class="info-wrap">
            <p>CPU核数</p>
            <p>
              <span>{{ state.cpuCoresTotal }}</span
              >核
            </p>
          </div>
        </div>
      </div>
      <div class="row-wrap">
        <div class="item-wrap">
          <img src="@/assets/images/overview/disk.png" alt="" />
          <div class="info-wrap">
            <p>磁盘容量</p>
            <p>
              <span>{{ Math.floor((Number.parseFloat(state.diskTotalGb) * 100) / 1024) / 100 }}</span
              >TB
            </p>
          </div>
        </div>
        <div class="item-wrap">
          <img src="@/assets/images/overview/system.png" alt="" />
          <div class="info-wrap">
            <p>部署系统</p>
            <p>
              <span>{{ state.deploySystemQuantity }}</span
              >个
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { apiGetHostConfigInfo } from '@/service/api/overview'

const state = reactive({
  hostTotal: 0,
  cpuCoresTotal: 0,
  diskTotalGb: '0',
  deploySystemQuantity: 0,
})

onMounted(() => {
  getHostConfigInfo()
})

const getHostConfigInfo = async () => {
  const { code, data } = await apiGetHostConfigInfo()
  if (code === 20000) {
    Object.assign(state, data)
  }
}
</script>

<style lang="less" scoped>
.config-info-wrapper {
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 505px;
    padding: 28px 14px;
    background-image: url('../../assets/images/overview/info-background.png');
    background-repeat: no-repeat;
    background-size: 100% 98%;
    overflow: auto;
    .row-wrap {
      display: flex;
      justify-content: space-around;
      .item-wrap {
        display: flex;
        align-items: center;
        img {
          width: 190px;
          height: 120px;
        }

        .info-wrap {
          p {
            width: 200px;
            margin: 0;
            font-size: 30px;
            span {
              margin-right: 4px;
              font-size: 50px;
              font-weight: bold;
              color: #03edfc;
            }
          }
        }
      }
    }
    .row-wrap:first-child {
      margin-bottom: 90px;
    }
  }
}
</style>
