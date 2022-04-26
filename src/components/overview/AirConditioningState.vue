<template>
  <div class="air-conditioning-state-wrapper">
    <div class="title-wrap">空调状态</div>
    <div class="content-wrap">
      <div class="air-conditioning-wrap">
        <div class="row-wrap" v-for="(item, index) in overviewData" :key="index">
          <div class="icon-wrap">
            <img
              src="@/assets/images/overview/air-conditioning.png"
              alt=""
              :class="{ 'air-condit-close': !item.open }"
            />
            <div class="info-wrap">
              <p>{{ item.pointLocation }}</p>
              <p v-if="item.open">开启</p>
              <p v-else style="color: #027f92">关闭</p>
            </div>
          </div>
          <div class="detail-wrap">
            <p>回风温度 {{ item.returnAirTemperature || '--' }}℃</p>
            <p>回风湿度 {{ item.returnAirHumidity || '--' }}℃</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  overviewData: any[]
}>()
</script>

<style lang="less" scoped>
.air-conditioning-state-wrapper {
  width: 100%;
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
    padding: 35px 14px 10px 14px;
    background-image: url('../../assets/images/overview/info-background.png');
    background-repeat: no-repeat;
    background-size: 100% 98%;
    overflow: hidden;
    .air-conditioning-wrap {
      height: 100%;
      overflow: auto;
      &::-webkit-scrollbar {
        width: 0;
      }
      .row-wrap {
        display: flex;
        justify-content: space-around;
        border-bottom: 1px solid #0b2557;
        padding: 24px 0 24px 0;

        &:first-child {
          margin: 0;
        }

        .icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1.5;

          img {
            width: 176px;
            height: 176px;
          }

          .air-condit-close {
            opacity: 0.6;
          }

          .info-wrap {
            margin-left: 5px;

            p {
              margin: 0;
              font-size: 40px;
              font-weight: bold;

              &:last-child {
                font-size: 70px;
                color: #04edef;
              }
            }
          }
        }

        .detail-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          p {
            font-size: 30px;
            margin: 5px 0;
            color: #b8d9ff;
          }
        }
      }
    }
  }
}
</style>
