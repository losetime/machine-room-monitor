<template>
  <div class="disk-usage-wrapper">
    <div class="title-wrap">磁盘占用</div>
    <div class="content-wrap">
      <div class="chart-wrap">
        <Gauge :series="chartInfo?.series || []" domId="disk-usage-power" />
      </div>
      <div class="info-wrap">
        <div class="item-wrap">
          <p>已使用</p>
          <p>
            <span>{{ diskUsage }}</span>
            <span>TB</span>
          </p>
        </div>
        <div class="item-wrap">
          <p>总容量</p>
          <p>
            <span>{{ diskTotal }}</span>
            <span>TB</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Gauge from '@/components/charts/Gauge.vue'
import * as echarts from 'echarts'
import { apiGetHostConfigInfo } from '@/service/api/overview'

onMounted(() => {
  getHostConfigInfo()
})

const diskUsage = ref()

const diskTotal = ref()

const chartInfo = ref()

const getHostConfigInfo = async () => {
  const { code, data } = await apiGetHostConfigInfo()
  if (code === 20000) {
    diskUsage.value = Math.floor((Number.parseFloat(data.diskUsedGb) * 100) / 1024) / 100
    diskTotal.value = Math.floor((Number.parseFloat(data.diskTotalGb) * 100) / 1024) / 100
    chartInfo.value = {
      series: [
        {
          type: 'gauge',
          radius: '80%',
          center: ['50%', '50%'],
          startAngle: 360,
          endAngle: 0,
          min: 0,
          max: diskTotal.value,
          splitNumber: 10,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(205,180,7)',
              },
              {
                offset: 1,
                color: 'rgb(239,52,3)',
              },
            ]),
          },
          progress: {
            show: true,
            roundCap: true,
            width: 10,
          },
          pointer: {
            show: false,
          },
          axisLine: {
            roundCap: true,
            lineStyle: {
              width: 20,
              color: [
                [
                  1,
                  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: 'rgb(0,232,254)',
                    },
                    {
                      offset: 1,
                      color: 'rgb(1,54,115)',
                    },
                  ]),
                ],
              ],
            },
          },
          axisTick: {
            distance: -30,
            lineStyle: {
              width: 1,
              color: 'rgb(0,232,254)',
            },
          },
          splitLine: {
            // show: false,
            distance: -20,
            length: 20,
            lineStyle: {
              width: 10,
              color: '#00142A',
            },
          },
          axisLabel: {
            show: false,
            distance: -20,
            color: '#999',
            fontSize: 12,
          },
          anchor: {
            show: false,
          },
          title: {
            show: false,
          },
          detail: {
            valueAnimation: true,
            width: '50%',
            borderRadius: 8,
            offsetCenter: [0, 0],
            fontSize: 20,
            fontWeight: 'bolder',
            formatter: function (value: number) {
              return Math.ceil((value * 100) / diskTotal.value) + '%'
            },
            color: '#03EDFC',
          },
          data: [
            {
              value: diskUsage.value,
            },
          ],
        },
      ],
    }
  }
}
</script>

<style lang="less" scoped>
.disk-usage-wrapper {
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
    display: flex;
    padding: 14px 14px;
    background-image: url('../../assets/images/overview/info-background.png');
    background-repeat: no-repeat;
    background-size: 100% 98%;
    // overflow: auto;

    .chart-wrap {
      width: 60%;
      height: 200px;
    }

    .info-wrap {
      width: 40%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .item-wrap {
        p {
          margin: 0;

          &:last-child {
            font-size: 16px;
          }

          &:last-child {
            span:first-child {
              font-size: 25px;
              margin-right: 4px;
            }
          }
        }

        &:first-child {
          margin-bottom: 14px;

          p:last-child {
            color: rgb(239, 52, 3);
          }
        }

        &:last-child {
          p:last-child {
            color: rgb(54, 110, 255);
          }
        }
      }
    }
  }
}
</style>