<template>
  <div class="air-conditioning-state-wrapper">
    <div class="title-wrap">空调状态</div>
    <div class="content-wrap">
      <div class="air-conditioning-wrap">
        <div class="row-wrap" v-for="(item, index) in overviewData" :key="index">
          <div class="icon-wrap">
            <img src="@/assets/images/overview/air-conditioning.png" alt="" />
            <div class="info-wrap">
              <p>{{ item.pointLocation }}</p>
              <p>{{ item.open ? '开启' : '关闭' }}</p>
            </div>
          </div>
          <div class="detail-wrap">
            <p>设定温度 {{ item.settingTemperature }}℃</p>
            <p>回风温度 {{ item.returnAirTemperature }}℃</p>
            <p>回风湿度 {{ item.returnAirHumidity }}℃</p>
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
    padding: 18px 14px 10px 14px;
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
        margin-top: 14px;

        &:first-child {
          margin: 0;
        }

        .icon-wrap {
          display: flex;
          align-items: center;

          img {
            width: 80px;
          }

          .info-wrap {
            margin-left: 5px;

            p {
              margin: 0;
              font-size: 16px;
              font-weight: bold;

              &:last-child {
                font-size: 24px;
                color: #04edef;
              }
            }
          }
        }

        .detail-wrap {
          p {
            margin: 5px 0;
          }
        }
      }
    }
  }
}
</style>
