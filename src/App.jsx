import React, { Component } from "react";
import Table1 from "./components/Table1";
import Table2 from "./components/Table2";
import { Input, Button } from "reactstrap";
import { AppContext } from "./contextAPI/appContext";

class App extends Component {
  static contextType = AppContext;

  render() {
    const { getRowNumber, rows, getFSum, secondTable } = this.context;
    return (
      <div>
        <Input
          placeholder="Enter Number Of Rows ..."
          type="number"
          name="row"
          onChange={getRowNumber}
          value={rows}
        />
        {rows ? (
          <div>
            <Table1 />
            <Button outline color="primary" onClick={getFSum}>
              Get Result
            </Button>
          </div>
        ) : null}
        {secondTable ? <Table2 /> : null}
      </div>
    );
  }
}

export default App;
