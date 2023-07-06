import {
  useGetZhenghouIdMutation,
  useGetRealityDataByIdMutation,
  useGetPredictionDataByIdMutation,
} from "./api";
import classes from "./App.module.css";
import { Input, Select, Button, Progress, List } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { debounce } from "lodash-es";

function App() {
  //钩子函数

  //API1 告知症候名 返回对应ID
  const [getZhenghouId, zhenghouData] = useGetZhenghouIdMutation();

  //API2 获取实际草药是否可用
  const [getReality, realityData] = useGetRealityDataByIdMutation();

  //API3 获取预测草药是否可用

  const [getPrediction, predictionData] = useGetPredictionDataByIdMutation();

  //state

  const [list, putList] = useState([
    { value: "", label: "请输入数据", type: 1 },
  ]);

  const [currentValue, putCurrentValue] = useState();

  const [_xxxxxx, _rerender] = useState();

  //负责控制 搜索框内容的动态更新

  useEffect(() => {
    if (!zhenghouData?.data?.theId) return;
    const dataList = zhenghouData.data.theId;
    putList(() => {
      const tem = dataList.map((sing) => {
        return { value: sing.ID, label: sing.symptoms };
      });

      return tem;
    });
  }, [zhenghouData]);

  useEffect(() => {
    console.log(realityData);
  }, [realityData, predictionData]);

  //自定义函数

  //用于控制输入框（防抖后）
  function onSearchHandler(value) {
    if (!value) return;
    getZhenghouId(value);
  }

  function onChangeHandler(e) {
    putCurrentValue(e);
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>症候在线查询</h1>

      <div style={{ display: "flex", gap: "1.2rem" }}>
        <Select
          style={{ width: "50%", fontSize: "2.4rem" }}
          filter
          remote
          placeholder="输入症候名"
          onSearch={debounce(onSearchHandler, 300)}
          optionList={list}
          emptyContent={null}
          onChange={onChangeHandler}
        ></Select>
        <Button
          style={{ marginLeft: "1rem" }}
          loading={
            (zhenghouData.isLoading ||
              realityData.isLoading ||
              predictionData.isLoading) === true
              ? true
              : false
          }
          onClick={() => {
            getReality(currentValue);
            getPrediction(currentValue);
          }}
        >
          点击
        </Button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          marginTop: "2.4rem",
        }}
      >
        <List
          header={<h2>实际可治疗该疾病的草药ID</h2>}
          bordered
          dataSource={realityData?.data?.result}
          renderItem={(item) => {
            if (!item) return;

            return (
              <List.Item style={{ fontSize: "1.4rem" }}>
                {item.中草药名称}
              </List.Item>
            );
          }}
        ></List>

        <List
          header={<h2>预测可治疗该疾病的草药ID</h2>}
          bordered
          dataSource={predictionData?.data?.result}
          renderItem={(item) => {
            if (!item) return;
            return <List.Item>{item.中草药名称}</List.Item>;
          }}
        ></List>
      </div>
    </div>
  );
}

export default App;
