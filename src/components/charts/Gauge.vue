<template>
  <div :id="domId"></div>
</template>

<script setup lang="ts">
import { unref, computed, watch, onMounted } from 'vue'
import * as echarts from 'echarts'
import { useStore } from '@/store'

const props = defineProps<{
  series: Array<any>
  domId: string
}>()

const store = useStore()

// 图表实例
let chartInstance: any = null

const sidebarStatus = computed(() => store.state.sidebarStatus)

watch(
  () => props.series,
  () => {
    if (unref(props.series).length > 0) {
      destroyInstance()
      chartInit()
    }
  },
)

watch(
  () => sidebarStatus.value,
  () => {
    const timeout = setTimeout(() => {
      destroyInstance()
      chartInit()
      clearTimeout(timeout)
    }, 200)
  },
)

onMounted(() => {
  if (Array.isArray(props.series) && props.series.length > 0) {
    chartInit()
  }
  window.addEventListener('resize', function () {
    const timeout = setTimeout(() => {
      destroyInstance()
      chartInit()
      clearTimeout(timeout)
    }, 200)
  })
})

/**
 * @desc 初始化dom
 */
const onDomInit = () => {
  const chartDom: any = document.getElementById(props.domId)
  const parentNode = chartDom.parentNode
  const paddingTop = parseInt(getComputedStyle(parentNode)['paddingTop'].slice(0, -2))
  const paddingLeft = parseInt(getComputedStyle(parentNode)['paddingLeft'].slice(0, -2))
  chartDom.style.height = parentNode.clientHeight - paddingTop * 2 + 'px'
  chartDom.style.width = parentNode.clientWidth - paddingLeft * 2 + 'px'
  chartInstance = echarts.init(chartDom)
}

/**
 * @desc 初始化图表
 */
const chartInit = () => {
  destroyInstance()
  onDomInit()
  let option: any = {}
  option.color = [
    '#1890FF',
    '#2FC25B',
    '#81D3F8',
    '#015C61',
    '#00C0E4',
    '#437B53',
    '#DDB23A',
    '#E6567A',
    '#7958F0',
    '#558262',
    '#E3BF58',
    '#24D3F4',
    '#EC6E8E',
    '#9477FB',
    '#81A58B',
    '#ECD080',
    '#94EBFB',
    '#FEA3B9',
    '#B2D2BA',
    '#EAC96A',
    '#45DAF6',
    '#FA89A5',
    '#AF99FF',
  ]
  option.series = props.series
  option && chartInstance.setOption(option)
}

/**
 * @desc 销毁实例
 */
const destroyInstance = () => {
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
}

defineExpose({
  chartInit,
  destroyInstance,
})
</script>
