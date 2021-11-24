// pages/multiCharts/index.js
import * as echarts from '../../utils/ec-canvas/echarts'; //引入echarts.js
var dataList = [];
var dataList2 = [];
var k = 0;
var Chart = [];
Page({
	/**
   * 页面的初始数据
   */
  data: {
    ec1: {
      lazyLoad: true // 延迟加载
    },
    ec2: {
      lazyLoad: true // 延迟加载
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.echartsComponnet1 = this.selectComponent('#mychart1');
    this.echartsComponnet2 = this.selectComponent('#mychart2');
    this.getData(); //获取数据
  },
  getData: function () {
  	/**
  	 * 此处模拟操作：
  	 * 获取数据json
  	 */
      dataList = [100, 92, 93, 94, 95, 96];//到课率图
      dataList2 = [107, 6, 7, 4];//缺课人数图
    /**
  	 * 此处模拟操作：
  	 * 循环更新各个图表数据
  	 */
    if (!Chart[0]) {
      this.init_echarts(1); //初始化图表
    } else {
      this.setOption(1); //更新数据
    }
    if (!Chart[1]) {
      this.init_echarts(2); //初始化图表
    } else {
      this.setOption(2); //更新数据
    }
  },
  //初始化图表
  init_echarts: function (i) {
    this['echartsComponnet' + i].init((canvas, width, height) => {
      // 初始化图表
      Chart[i - 1] = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      this.setOption(i);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart[i - 1];
    });
  },
  setOption: function (i) {
    Chart[i - 1].clear();  // 清除
    Chart[i - 1].setOption(this['getOption' + i]());  //获取新数据
  },
  getOption1: function () {
    // 指定图表的配置项和数据
    var option = {
      xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4', '5','6'],
        name:"第x节课",
        nameTextStyle: 
        {
          padding: [30, 0, 0, -30]    // 四个数字分别为上右下左与原位置距离
        }
      },
      yAxis: {
        type: 'value',
        name:"到课率/%",
        nameTextStyle: 
        {
          padding: [150, 0, 0, 20]  ,  // 四个数字分别为上右下左与原位置距离
          fontsize:50
        }
      },
      series: [{
        data: dataList,
        type: 'line',
        itemStyle:
        {
          color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#4990e2'
            }, {
            offset: 1,
            color: '#87c1f1'
            }])
        }
      }],
      grid: {
        left: '10%',
        right: '10%',
        bottom: '10%',
        containLabel: true
      }
    }
    return option;
  },
  getOption2: function () {
    // 指定图表的配置项和数据
    var option = {
      xAxis: {
        type: 'category',
        data: ['0', '1', '2', '>=3'],
        name:"累计缺课次数/次",
        nameTextStyle: 
        {
          padding: [60, 0, 0, -90]    // 四个数字分别为上右下左与原位置距离
        }
      },
      yAxis: {
        type: 'value',
        name:"人数/人",
        nameTextStyle: 
        {
          padding: [150, 0, 0, 20]    // 四个数字分别为上右下左与原位置距离
        }
      },
      series: [{
        data: dataList2,
        type: 'bar',
        itemStyle:
        {
          color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: '#4990e2'
            }, {
            offset: 1,
            color: '#87c1f1'
            }])
        }
      }],

      grid: {
        left: '10%',
        right: '10%',
        bottom: '10%',
        containLabel: true
      }
    }
    
    return option;
  }
})
