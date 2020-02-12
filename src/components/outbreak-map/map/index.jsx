import React, { useState, useEffect, useCallback } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
import pinyin from 'pinyin';

/*
  在React中使用echarts
  一个类似于丁香医生的疫情地图
*/
import './index.less';

export default function Map() {
  const [cityName, setCityName] = useState('china');
  const [loading, setLoading] = useState(false);
  const [seriesData, setSeriesData] = useState([]);

  const getOption = useCallback(() => {
    const isChina = cityName === 'china';

    window.handleTooltipClick = name => {
      const pinyinName = pinyin(name, {
        style: pinyin.STYLE_NORMAL,
        heteronym: true
      }).reduce((p, c) => p + c[0], '');
      setCityName(pinyinName);
    };

    // option对象具体参数：参照echarts文档
    return {
      backgroundColor: '#fff',
      // 地图提示框组件。
      tooltip: {
        padding: [3, 5],
        triggerOn: 'click',
        trigger: 'item',
        enterable: true,
        formatter: item => {
          return `<div class='tooltip'>
            <span>
              省份: ${item.name}
              <br />
              确诊: ${item.value || 0}
            </span>
            ${
              isChina
                ? `<span class='tooltip-detail' onclick="handleTooltipClick('${item.name}')">详情</span>`
                : ''
            }
          </div>`;
        },
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        textStyle: {
          fontSize: 26
        }
      },
      geo: {
        map: cityName,
        zoom: 1.22,
        silent: false,
        roam: false,
        scaleLimit: {
          min: 1.22,
          max: 3
        },
        label: {
          normal: {
            show: !0,
            fontSize: 16,
            color: '#000'
          }
        },
        itemStyle: {
          normal: {
            borderColor: '#999',
            areaColor: '#fff'
          }
        },
        regions: seriesData
          .map(({ name, value, selected }) => {
            return '陕西' === name
              ? {
                  name,
                  label: {
                    normal: {
                      padding: [10, 15, 0, 0]
                    }
                  }
                }
              : '内蒙古' === name
              ? {
                  name,
                  label: {
                    normal: {
                      padding: [30, 30, 0, 0]
                    }
                  }
                }
              : value > 499
              ? {
                  name,
                  label: {
                    normal: {
                      color: '#fff'
                    }
                  }
                }
              : selected
              ? {
                  name
                }
              : null;
          })
          .filter(Boolean)
      },
      // 地图怎么填充数据
      visualMap: {
        // 分段式填充
        orient: isChina ? 'vertical' : 'horizontal',
        show: true,
        width: 1,
        left: 15,
        bottom: 15,
        itemWidth: isChina ? 20 : 10,
        itemHeight: 16,
        padding: 0,
        itemGap: 10,
        // 指定如何分段
        pieces: [
          { min: 10000, color: '#4f070d' }, // 不指定 max，表示 max 为无限大（Infinity）。
          { min: 1000, max: 10000, color: '#811c24' },
          { min: 500, max: 999, color: '#cb2a2f' },
          { min: 100, max: 499, color: '#e55a4e' },
          { min: 10, max: 99, color: '#f59e83' },
          { min: 1, max: 9, color: '#fdebcf' }
        ],
        textStyle: {
          color: '#333',
          fontSize: 20
        }
      },
      // 地图数据
      series: [
        {
          name: '疫情数量',
          type: 'map', // 图表是地图类型
          mapType: cityName, // 自定义扩展图表类型
          geoIndex: 0,
          data: seriesData
        }
      ]
    };
  }, [cityName, seriesData]);

  // 生命周期函数
  // 如果cityName变化了，就重新加载~
  useEffect(() => {
    setLoading(true);

    const isCounty = cityName === 'china';

    // 初始化地图
    const initCityMapPromise = import(
      `echarts/map/json/${isCounty ? '' : `province/`}${cityName}`
    );

    const name = isCounty ? 'county' : 'city';
    // 加载city数据
    const initCityDataPromise = import(`../../../data/${name}.json`);

    Promise.all([initCityMapPromise, initCityDataPromise])
      .then(([map, data]) => {
        // 默认暴露， 所以要通过 map.default 获取值
        // 初始化地图
        echarts.registerMap(cityName, map.default);

        data = data.default;

        if (!isCounty) {
          data = data.find(city => city.pinyin === cityName).cities;
        }

        const seriesData = data.map(item => {
          return {
            name: isCounty ? item.provinceShortName : item.cityName,
            value: item.confirmedCount
          };
        });

        setSeriesData(seriesData);
        setLoading(false);

        if (cityName !== 'china') {
          window.scrollTo(0, 900);
        }
      })
      .catch(err => {
        console.log('数据请求失败~');
        console.log(err);
      });
  }, [cityName]);

  if (loading) return <div>loading...</div>;

  return (
    <div style={{ width: '100%', height: 600 }}>
      <ReactEcharts
        option={getOption()}
        style={{ width: '100%', height: 600 }}
      />
    </div>
  );
}
