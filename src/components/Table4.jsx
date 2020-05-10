import React, { useContext } from "react";
import { Table, Row, Col, Input } from "reactstrap";
import { AppContext } from "../contextAPI/appContext";

const Table4 = () => {
  const {
    orderQ,
    reOrderPonit,
    getReorder,
    getOrderQ,
    random,
    sim,
    randomForL,
    simForL,
  } = useContext(AppContext);
  return (
    <div>
      <Row className="end">
        <Col className="right">
          <Input
            placeholder="Enter Order Quantity ..."
            type="number"
            name="Order"
            onChange={getOrderQ}
            value={orderQ}
          />
        </Col>
        <Col className="left">
          <Input
            placeholder="Enter Reorder Point ..."
            type="number"
            name="Reorder"
            onChange={getReorder}
            value={reOrderPonit}
          />
        </Col>
      </Row>
      {reOrderPonit && orderQ ? (
        <Table borderless hover>
          <thead>
            <tr>
              <th>Day</th>
              <th>Units</th>
              <th>B{"EGINNING".toLowerCase()}</th>
              <th>R{"ANDOM".toLowerCase()}</th>
              <th>Demand</th>
              <th>Ending</th>
              <th>Lost</th>
              <th>Order</th>
              <th>Random</th>
              <th>LeadTime</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              const TableData = [];
              const rowResult = [];
              let temp = {
                day: { number: 0, currenttlyOnLead: false, period: 0 },
                unitsR: orderQ,
                begining: orderQ,
                Random: "",
                demand: "",
                randomNumber: "",
                leadTime: "",
              };
              for (let i = 1; i <= 10; i++) {
                temp["day"].number = i;
                temp["Random"] = random[i - 1];
                temp["demand"] = sim[i - 1];
                if (temp["day"].currenttlyOnLead) {
                  temp["day"].period -= 1;
                  if (temp["day"].period === 0) {
                    temp["day"].currenttlyOnLead = false;
                    temp["unitsR"] = 10;
                    temp["begining"] += 10;
                  }
                }
                temp["Ending"] = temp["begining"] - temp["demand"];
                if (parseInt(temp["begining"]) > parseInt(temp["demand"])) {
                  temp["lost"] = 0;
                } else {
                  temp["Ending"] = 0;
                  temp["lost"] = Math.abs(
                    parseInt(temp["begining"]) - parseInt(temp["demand"])
                  );
                }
                if (temp["Ending"] > reOrderPonit) {
                  temp["Order"] = "No";
                } else {
                  if (!temp["day"].currenttlyOnLead) {
                    temp["Order"] = "Yes";
                  }
                }
                if (temp["Order"] === "Yes") {
                  temp["randomNumber"] = randomForL[i - 1];
                  temp["leadTime"] = simForL[i - 1];
                  temp["day"].currenttlyOnLead = true;
                  temp["day"].period = parseInt(simForL[i - 1]) + 1;
                }
                TableData.push(
                  <tr>
                    <td>{`${temp["day"].number}`}</td>
                    <td>{`${temp["unitsR"]}`}</td>
                    <td>{`${temp["begining"]}`}</td>
                    <td>{`${temp["Random"]}`}</td>
                    <td>{`${temp["demand"]}`}</td>
                    <td>{`${temp["Ending"]}`}</td>
                    <td>{`${temp["lost"]}`}</td>
                    <td>{`${temp["Order"]}`}</td>
                    <td>{`${temp["randomNumber"]}`}</td>
                    <td>{`${temp["leadTime"]}`}</td>
                  </tr>
                );
                rowResult.push({
                  day: temp["day"].number,
                  unitsRecived: temp["unitsR"],
                  begining: temp["begining"],
                  demand: temp["demand"],
                  ending: temp["Ending"],
                  lost: temp["lost"],
                });
                temp["Order"] = "No";
                temp["begining"] = temp["Ending"];
                temp["randomNumber"] = "";
                temp["leadTime"] = "";
                temp["unitsR"] = 0;
              }
              return TableData;
            })()}
          </tbody>
        </Table>
      ) : null}
    </div>
  );
};

export default Table4;
