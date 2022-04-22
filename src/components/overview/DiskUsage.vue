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
    const usageRate = Math.ceil((diskUsage.value / diskTotal.value) * 100)
    chartInfo.value = {
      series: [
        {
          type: 'gauge',
          radius: '75%',
          center: ['50%', '50%'],
          startAngle: 0,
          endAngle: 360,
          min: 0,
          max: diskTotal.value,
          splitNumber: 10,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: usageRate > 70 ? 'rgb(239,52,3)' : 'rgb(0,242,254)',
              },
              {
                offset: 1,
                color: usageRate > 70 ? 'rgb(205,180,7)' : 'rgb(0,54,117)',
              },
            ]),
          },
          progress: {
            show: true,
            width: 40,
          },
          pointer: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              width: 40,
              color: [
                [
                  1,
                  '#013877',
                  // new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  //   {
                  //     offset: 0,
                  //     color: 'rgb(0,232,254)',
                  //   },
                  //   {
                  //     offset: 1,
                  //     color: 'rgb(1,54,115)',
                  //   },
                  // ]),
                ],
              ],
            },
          },
          axisTick: {
            distance: -50,
            lineStyle: {
              width: 1,
              color: 'rgb(0,232,254)',
            },
          },
          splitLine: {
            distance: -40,
            length: 40,
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
            width: 200,
            height: 200,
            borderRadius: 200,
            borderWidth: 2,
            borderColor: usageRate > 70 ? 'rgb(226,101,5)' : 'rgb(7,87,206)',
            offsetCenter: [0, 0],
            fontSize: 60,
            color: usageRate > 70 ? 'rgb(238,52,3)' : 'rgb(3,237,252)',
            fontWeight: 'bolder',
            formatter: function () {
              return usageRate + '%'
            },
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
    padding: 14px 14px;
    background-image: url('../../assets/images/overview/info-background.png');
    background-repeat: no-repeat;
    background-size: 100% 98%;
    // overflow: auto;

    .chart-wrap {
      width: 60%;
      height: 485px;
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
          font-size: 30px;

          &:last-child {
            span:first-child {
              font-size: 80px;
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
