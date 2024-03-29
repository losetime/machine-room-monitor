import { $http } from '../http/index'

enum Api {
  getHostConfigInfo = '/monitor/homepage/getHomePageNumericMetrics',
  getSystemDeploy = '/monitor/homepage/listSystemOverview',
  getCpuUsageTop5 = '/monitor/homepage/listRecentDayAvgCpuUsedRateTopN',
  getMemoryUsageTop5 = '/monitor/homepage/listRecentDayAvgMemoryUsedRateTopN',
  getMonitorOverviewInfo = '/monitor/donghuan/queryLatestDonghuanData',
  getCpuUsageInfo = '/monitor/homepage/listCurrentDaySystemHostCpuUsedRate',
  getMemoryUsageInfo = '/monitor/homepage/listCurrentDaySystemHostMemoryUsedRate',
}

// -------------------------------------- 首页 --------------------------------------------------

/**
 * @desc: 获取统计指标
 */
export function apiGetHostConfigInfo(): Promise<any> {
  return $http.request({
    url: Api.getHostConfigInfo,
    method: 'GET',
    headers: {
      ignoreCancelToken: true, // 忽略关闭重复请求
    },
  })
}

/**
 * @desc: 获取系统部署情况
 */
export function apiGetSystemDeploy(): Promise<any> {
  return $http.request({
    url: Api.getSystemDeploy,
    method: 'GET',
    headers: {
      ignoreCancelToken: true,
    },
  })
}

/**
 * @desc: 获取cpu使用top5
 */
export function apiGetCpuUsageTop5(params: { topN: number; recentDays: number }): Promise<any> {
  return $http.request({
    url: Api.getCpuUsageTop5,
    method: 'GET',
    params,
  })
}

/**
 * @desc: 获取内存使用top5
 */
export function apiGetMemoryUsageTop5(params: { topN: number; recentDays: number }): Promise<any> {
  return $http.request({
    url: Api.getMemoryUsageTop5,
    method: 'GET',
    params,
  })
}

/**
 * @desc: 当日系统主机CPU占用情况
 */
export function apiGetCpuUsageInfo(params: { systemCodeList?: string; windowSec?: number }): Promise<any> {
  return $http.request({
    url: Api.getCpuUsageInfo,
    method: 'GET',
    params,
    headers: {
      ignoreCancelToken: true, // 忽略关闭重复请求
    },
  })
}

/**
 * @desc: 当日系统主机内存占用情况
 */
export function apiGetMemoryUsageInfo(params: { systemCodeList?: string; windowSec?: number }): Promise<any> {
  return $http.request({
    url: Api.getMemoryUsageInfo,
    method: 'GET',
    params,
    headers: {
      ignoreCancelToken: true, // 忽略关闭重复请求
    },
  })
}

/**
 * @desc 获取动环监控相关数据
 */
export function apiGetMonitorOverviewInfo(): Promise<any> {
  return $http.request({
    url: Api.getMonitorOverviewInfo,
    method: 'GET',
  })
}
