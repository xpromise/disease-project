/*
  puppeteer 无头浏览器

  1. 打开浏览器
  2. 新建一个Tab页
  3. 输入网址， 等待页面加载完成
  4. 爬取数据（将数据存储起来）
  5. 关闭浏览器
*/
// 引入
const puppeteer = require('puppeteer');
const fs = require('fs');
const { resolve } = require('path');
const pinyin = require('pinyin');

(async () => {
  // 1. 打开浏览器
  const browser = await puppeteer.launch({
    headless: false
  });
  // 2. 新建一个Tab页
  const page = await browser.newPage();
  // 3. 输入网址， 等待页面加载完成
  await page.goto('https://ncov.dxy.cn/ncovh5/view/pneumonia', {
    // 等待页面触发load事件
    waitUntil: 'load'
  });
  // 4. 爬取数据（将数据存储起来）
  const result = await page.evaluate(() => {
    return {
      // 中国所有城市的详情数据
      city: window.getAreaStat,
      // 中国所有省份/城市的基本数据
      county: window.getListByCountryTypeService1
    };
  });

  let { county, city } = result;

  function addPinyin(data) {
    return data.map(item => {
      if (item.cities) {
        return {
          ...item,
          cities: addPinyin(item.cities),
          pinyin: getPinyin(item.provinceShortName)
        };
      }
      return {
        ...item,
        pinyin: getPinyin(item.provinceShortName || item.cityName)
      };
    });
  }

  function getPinyin(name) {
    return pinyin(name, {
      style: pinyin.STYLE_NORMAL,
      heteronym: true
      // segment: true
    }).reduce((p, c) => p + c[0], '');
  }

  // 加pinyin
  city = addPinyin(city);
  county = addPinyin(county);

  function addShi(data) {
    return data.map(province => {
      return {
        ...province,
        cities: province.cities.map(city => {
          const { cityName } = city;
          if (cityName.length < 4) {
            return {
              ...city,
              cityName: cityName + '市'
            };
          }
          return city;
        })
      }
    });
  }
  // 加“市”
  city = addShi(city);

  // 数据保存成json文件
  const cityPath = resolve(__dirname, '../src/data/city.json');
  fs.writeFile(cityPath, JSON.stringify(city), err => {
    if (!err) {
      console.log('文件写入成功~');
    } else {
      console.log(err);
    }
  });

  const countyPath = resolve(__dirname, '../src/data/county.json');
  fs.writeFile(countyPath, JSON.stringify(county), err => {
    if (!err) {
      console.log('文件写入成功~');
    } else {
      console.log(err);
    }
  });
  // 关闭浏览器
  await browser.close();
})();
