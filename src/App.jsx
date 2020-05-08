import React, { Component } from "react";
import Table1 from "./components/Table1";
import Table2 from "./components/Table2";
import { Input, Button } from "reactstrap";
import _ from "lodash";

let StarterState = {
  demands: {},
  Frequency: {},
  prob: [],
  cum: [],
  randomNumbers: [],
  random: [],
  sim: [],
  expected: 0,
  simSum: 0,
  sumF: 0,
  rows: "",
  secondTable: false,
};
class App extends Component {
  state = { ...StarterState };

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
    avExpected=parseFloat(avExpected.toFixed(2));
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

  render() {
    return (
      <div>
        <Input
          placeholder="Enter Number Of Rows ..."
          type="number"
          name="row"
          onChange={this.getRowNumber}
          value={this.state.rows}
        />
        {this.state.rows ? (
          <div>
            <Table1
              Frequency={this.state.Frequency}
              onInputChangeD={this.onInputChangeD}
              demands={this.state.demands}
              onInputChangeF={this.onInputChangeF}
              prob={this.state.prob}
              cum={this.state.cum}
              randomNumbers={this.state.randomNumbers}
              rows={this.state.rows}
            />
            <Button outline color="primary" onClick={this.getFSum}>
                Get Result
            </Button>
          </div>
        ) : null}
        {this.state.secondTable ? (
          <Table2
            simSum={this.state.simSum}
            expected={this.state.expected}
            random={this.state.random}
            sim={this.state.sim}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
