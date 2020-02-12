import React, { useState, useEffect, useCallback } from 'react';
import { WingBlank } from 'antd-mobile';
import { inject, observer } from 'mobx-react';

import dayjs from 'dayjs';
import Tip from '../../tip';
import question from './question.png';
import open from './open.png';
import './index.less';

function Statistic({ explainModalStore }) {
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(false);
  const [noteList, setNoteList] = useState(null);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const statistics = {
        createTime: 1579537899000,
        modifyTime: 1581388100000,
        confirmedCount: 42708, // 确诊
        confirmedIncr: 2484,
        suspectedCount: 21675, // 疑似
        suspectedIncr: 3536,
        curedCount: 4005, // 治愈
        curedIncr: 723,
        deadCount: 1017, // 死亡
        deadIncr: 108,
        seriousCount: 7333, // 重症
        seriousIncr: 849,
        remark1:
          '易感人群：人群普遍易感。老年人及有基础疾病者感染后病情较重，儿童及婴幼儿也有发病',
        remark2:
          '潜伏期：一般为 3～7 天，最长不超过 14 天，潜伏期内可能存在传染性，其中无症状病例传染性非常罕见',
        remark3: '宿主：野生动物，可能为中华菊头蝠',
        remark4: '',
        remark5: '',
        note1: '病毒：新型冠状病毒 2019-nCoV',
        note2: '传染源：新冠肺炎的患者。无症状感染者也可能成为传染源。',
        note3:
          '传播途径：经呼吸道飞沫、接触传播是主要的传播途径。气溶胶传播和消化道等传播途径尚待明确。'
      };

      setStatistics(statistics);
      setLoading(false);
    }, 1000);
  }, []);

  const showExplainModal = useCallback(() => {
    explainModalStore.setIsShowExplainModal(true);
  }, [explainModalStore]);

  const openNoteList = () => {
    const { remark1, remark2, remark3, remark4, remark5 } = statistics;
    const noteList = [remark1, remark2, remark3, remark4, remark5].filter(
      Boolean
    );
    setNoteList(noteList);
  };

  if (loading) {
    return <div className='loading-text'>数据加载中...</div>;
  }

  return (
    <WingBlank size='lg'>
      <div className='title' onClick={showExplainModal}>
        <span>
          截至 {dayjs(statistics.modifyTime).format('YYYY-MM-DD HH:mm')}
          全国数据统计
        </span>
        <span className='title-desc'>
          <img src={question} alt='question' />
          数据说明
        </span>
      </div>
      <ul className='tip-list'>
        <Tip
          color='rgb(247, 76, 49)'
          text='确诊'
          count={statistics.confirmedCount}
          increment={statistics.confirmedIncr}
        />
        <Tip
          color='rgb(247, 130, 7)'
          text='疑似'
          count={statistics.suspectedCount}
          increment={statistics.suspectedIncr}
        />
        <Tip
          color='rgb(162, 90, 78)'
          text='重症'
          count={statistics.seriousCount}
          increment={statistics.seriousIncr}
        />
        <Tip
          color='rgb(93, 112, 146)'
          text='死亡'
          count={statistics.deadCount}
          increment={statistics.deadIncr}
        />
        <Tip
          color='rgb(40, 183, 163)'
          text='治愈'
          count={statistics.curedCount}
          increment={statistics.curedCount}
        />
      </ul>
      <ul
        className='note-list'
        style={{ height: noteList ? '7.6rem' : '2.8rem' }}
      >
        <li>
          <i className='red-note note-img'></i>
          <span>{statistics.note1}</span>
        </li>
        <li>
          <i className='red-note note-img'></i>
          <span>{statistics.note2}</span>
        </li>
        {noteList ? (
          <li>
            <i className='red-note note-img'></i>
            <span>{statistics.note3}</span>
          </li>
        ) : (
          <li className='desc-multi'>
            <i className='red-note note-img'></i>
            <span className='text-ellipsis'>{statistics.note3}</span>
            <img
              onClick={openNoteList}
              className='open-note-list'
              src={open}
              alt='展开'
            />
          </li>
        )}
        {noteList
          ? noteList.map((item, index) => {
              return (
                <li key={index}>
                  <i className='orange-note note-img'></i>
                  <span>{item}</span>
                </li>
              );
            })
          : null}
      </ul>
    </WingBlank>
  );
}

export default inject('explainModalStore')(observer(Statistic));
