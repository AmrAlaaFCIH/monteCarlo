import React, { useContext } from "react";
import Table1 from "./components/Table1";
import Table2 from "./components/Table2";
import Table3 from "./components/Table3";
import { Input, Button, Row, Col } from "reactstrap";
import { AppContext } from "./contextAPI/appContext";

const App = () => {
  const {
    getRowNumber,
    rows,
    getFSum,
    secondTable,
    onModelChange,
    modalType,
  } = useContext(AppContext);
  return (
    <div>
      <Row>
        <Col className="right">
          <Input
            placeholder="Enter Number Of Rows ..."
            type="number"
            name="row"
            onChange={getRowNumber}
            value={rows}
          />
        </Col>
        <Col className="left">
          <Input type="select" name="ModelType" onChange={onModelChange}>
            <option value="">Select a Simulation Model...</option>
            <option value="1">Basic</option>
            <option value="2">With Inventory</option>
          </Input>
        </Col>
      </Row>
      {(() => {
        switch (modalType) {
          case "1":
            return rows ? (
              <div>
                <Table1 />
                <Button outline color="primary" onClick={getFSum}>
                  Get Result
                </Button>
                {secondTable ? <Table2 /> : null}
              </div>
            ) : null;
          case "2":
            return rows ? (
              <div>
                <Table1 />
                <Table3 />
              </div>
            ) : null;
          default:
            break;
        }
      })()}
    </div>
  );
};

export default App;
