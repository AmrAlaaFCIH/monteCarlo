import React, { Component } from "react";
import _ from "lodash";

export const AppContext = React.createContext();

class AppProvider extends Component {
  state = {
    demands: {},
    Frequency: {},
    leadTime: {},
    FrequencyForL: {},
    prob: [],
    probForL: [],
    cum: [],
    cumForL: [],
    randomNumbers: [],
    randomNumbersForL: [],
    random: [],
    randomForL: [],
    sim: [],
    simForL: [],
    expected: 0,
    simSum: 0,
    rows: "",
    rowsForL: "",
    secondTable: false,
    modalType: "",
    orderQ: "",
    reOrderPonit: "",
    showResultTable: false,
    year: "",
    orderCost: "",
    holdCost: "",
    lostCost: "",
  };

  onInputChangeD = (e) => {
    this.setState({
      demands: { ...this.state.demands, [e.target.name]: e.target.value },
      prob: [],
      cum: [],
      randomNumbers: [],
      random: [],
      sim: [],
      simSum: 0,
      expected: 0,
      showResultTable: false,
    });
  };
  onInputChangeDForL = (e) => {
    this.setState({
      leadTime: { ...this.state.leadTime, [e.target.name]: e.target.value },
      probForL: [],
      cumForL: [],
      randomNumbersForL: [],
      randomForL: [],
      simForL: [],
      showResultTable: false,
    });
  };
  onInputChangeF = (e) => {
    this.setState({
      Frequency: { ...this.state.Frequency, [e.target.name]: e.target.value },
      prob: [],
      cum: [],
      randomNumbers: [],
      random: [],
      sim: [],
      simSum: 0,
      expected: 0,
      showResultTable: false,
    });
  };
  onInputChangeFForL = (e) => {
    this.setState({
      FrequencyForL: {
        ...this.state.FrequencyForL,
        [e.target.name]: e.target.value,
      },
      probForL: [],
      cumForL: [],
      randomNumbersForL: [],
      randomForL: [],
      simForL: [],
      showResultTable: false,
    });
  };
  getRowNumber = (e) => {
    this.setState({
      rows: e.target.value,
      secondTable: false,
      prob: [],
      cum: [],
      randomNumbers: [],
      random: [],
      sim: [],
      simSum: 0,
      expected: 0,
      Frequency: {},
      demands: {},
    });
  };
  getRowNumberForL = (e) => {
    this.setState({
      rowsForL: e.target.value,
      probForL: [],
      cumForL: [],
      randomNumbersForL: [],
      randomForL: [],
      simForL: [],
      FrequencyForL: {},
      leadTime: {},
      showResultTable: false,
      orderQ: "",
      reOrderPonit: "",
      year: "",
      orderCost: "",
      holdCost: "",
      lostCost: "",
    });
  };

  getOrderQ = (e) => {
    this.setState({ orderQ: e.target.value });
  };
  getReorder = (e) => {
    this.setState({ reOrderPonit: e.target.value });
  };

  getFSum = (e) => {
    let parse = Number.parseInt;
    let sum = Object.values(this.state.Frequency).reduce(
      (a, b) => parse(a) + parse(b),
      0
    );
    let probArr = Object.values(this.state.Frequency).map((value) =>
      parseFloat((value / sum).toFixed(2))
    );
    let cumprob = [];
    probArr.reduce(
      (a, b, i) => (cumprob[i] = parseFloat(parseFloat(a + b).toFixed(2))),
      0
    );
    let rndm = [];
    for (let i = 0; i < cumprob.length; i++) {
      rndm.push([
        ..._.range(
          i === 0 ? 1 : cumprob[i - 1] * 100 + 1,
          cumprob[i] * 100 + 1
        ),
      ]);
    }
    let exprndm = [];
    for (let i = 1; i <= 10; i++) {
      exprndm.push(_.random(1, 100, false));
    }
    let newArr = [];
    exprndm.forEach((num) => {
      rndm.forEach((list, i) => {
        if (list.includes(num)) {
          newArr.push(Object.values(this.state.demands)[i]);
        }
      });
    });
    let sumsim = newArr.reduce((a, b) => parse(a) + parse(b), 0);
    let avExpected = 0;
    for (let i = 0; i < this.state.rows; i++) {
      avExpected += probArr[i] * Object.values(this.state.demands)[i];
    }
    avExpected = parseFloat(avExpected.toFixed(2));
    this.setState({
      prob: probArr,
      cum: cumprob,
      randomNumbers: rndm,
      random: exprndm,
      sim: newArr,
      simSum: sumsim,
      expected: avExpected,
      secondTable: true,
    });
  };

  getFSumForL = (e) => {
    let parse = Number.parseInt;
    let sum = Object.values(this.state.Frequency).reduce(
      (a, b) => parse(a) + parse(b),
      0
    );
    let probArr = Object.values(this.state.Frequency).map((value) =>
      parseFloat((value / sum).toFixed(2))
    );
    let cumprob = [];
    probArr.reduce(
      (a, b, i) => (cumprob[i] = parseFloat(parseFloat(a + b).toFixed(2))),
      0
    );
    let rndm = [];
    for (let i = 0; i < cumprob.length; i++) {
      rndm.push([
        ..._.range(
          i === 0 ? 1 : cumprob[i - 1] * 100 + 1,
          cumprob[i] * 100 + 1
        ),
      ]);
    }
    let exprndm = [];
    for (let i = 1; i <= 10; i++) {
      exprndm.push(_.random(1, 100, false));
    }
    let newArr = [];
    exprndm.forEach((num) => {
      rndm.forEach((list, i) => {
        if (list.includes(num)) {
          newArr.push(Object.values(this.state.demands)[i]);
        }
      });
    });
    let sumForL = Object.values(this.state.FrequencyForL).reduce(
      (a, b) => parse(a) + parse(b),
      0
    );
    let probArrForL = Object.values(this.state.FrequencyForL).map((value) =>
      parseFloat((value / sumForL).toFixed(2))
    );
    let cumprobForL = [];
    probArrForL.reduce(
      (a, b, i) => (cumprobForL[i] = parseFloat(parseFloat(a + b).toFixed(2))),
      0
    );
    let rndmForL = [];
    for (let i = 0; i < cumprobForL.length; i++) {
      rndmForL.push([
        ..._.range(
          i === 0 ? 1 : cumprobForL[i - 1] * 100 + 1,
          cumprobForL[i] * 100 + 1
        ),
      ]);
    }
    let exprndmForL = [];
    for (let i = 1; i <= 10; i++) {
      exprndmForL.push(_.random(1, 100, false));
    }
    let newArrForL = [];
    exprndmForL.forEach((num) => {
      rndmForL.forEach((list, i) => {
        if (list.includes(num)) {
          newArrForL.push(Object.values(this.state.leadTime)[i]);
        }
      });
    });
    this.setState({
      prob: probArr,
      cum: cumprob,
      randomNumbers: rndm,
      random: exprndm,
      sim: newArr,
      probForL: probArrForL,
      cumForL: cumprobForL,
      randomNumbersForL: rndmForL,
      randomForL: exprndmForL,
      simForL: newArrForL,
      showResultTable: true,
    });
  };

  onModelChange = (e) => {
    this.setState({ modalType: e.target.value });
  };

  setYear = (e) => {
    this.setState({ year: e.target.value });
  };
  setOrderCost = (e) => {
    this.setState({ orderCost: e.target.value });
  };
  setHoldCost = (e) => {
    this.setState({ holdCost: e.target.value });
  };
  setLostCost = (e) => {
    this.setState({ lostCost: e.target.value });
  };

  render() {
    const {
      demands,
      Frequency,
      prob,
      cum,
      randomNumbers,
      random,
      sim,
      expected,
      simSum,
      rows,
      secondTable,
      modalType,
      leadTime,
      FrequencyForL,
      probForL,
      cumForL,
      randomNumbersForL,
      randomForL,
      simForL,
      rowsForL,
      showResultTable,
      orderQ,
      reOrderPonit,
      year,
      orderCost,
      holdCost,
      lostCost,
    } = this.state;

    const {
      onInputChangeD,
      onInputChangeF,
      getRowNumber,
      getFSum,
      onModelChange,
      getRowNumberForL,
      onInputChangeFForL,
      onInputChangeDForL,
      getFSumForL,
      getOrderQ,
      getReorder,
      setHoldCost,
      setLostCost,
      setOrderCost,
      setYear,
    } = this;

    return (
      <AppContext.Provider
        value={{
          year,
          orderCost,
          holdCost,
          lostCost,
          setHoldCost,
          setLostCost,
          setOrderCost,
          setYear,
          orderQ,
          reOrderPonit,
          getReorder,
          getOrderQ,
          demands,
          Frequency,
          prob,
          cum,
          randomNumbers,
          random,
          sim,
          expected,
          simSum,
          rows,
          secondTable,
          onInputChangeD,
          onInputChangeF,
          getRowNumber,
          getFSum,
          onModelChange,
          modalType,
          leadTime,
          FrequencyForL,
          probForL,
          cumForL,
          randomNumbersForL,
          randomForL,
          simForL,
          rowsForL,
          getRowNumberForL,
          onInputChangeFForL,
          onInputChangeDForL,
          getFSumForL,
          showResultTable,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
