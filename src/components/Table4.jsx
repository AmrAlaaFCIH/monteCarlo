import React, { useContext } from "react";
import { Table, Row, Col, Input, Alert , Button } from "reactstrap";
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
    year,
    orderCost,
    holdCost,
    lostCost,
    setHoldCost,
    setLostCost,
    setOrderCost,
    getFSumForL,
    setYear,
  } = useContext(AppContext);
  return (
    <div>
      <Row>
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
      <Row>
        <Col className="right">
          <Input
            placeholder="Enter Number of Days of Your Market Year ..."
            type="number"
            name="Order"
            onChange={setYear}
            value={year}
          />
        </Col>
        <Col className="left">
          <Input
            placeholder="Enter Ordering Cost per order..."
            type="number"
            name="Reorder"
            onChange={setOrderCost}
            value={orderCost}
          />
        </Col>
      </Row>
      <Row className="end">
        <Col className="right">
          <Input
            placeholder="Enter Holding Cost per Year ..."
            type="number"
            name="Order"
            onChange={setHoldCost}
            value={holdCost}
          />
        </Col>
        <Col className="left">
          <Input
            placeholder="Enter Lost Sale Cost ..."
            type="number"
            name="Reorder"
            onChange={setLostCost}
            value={lostCost}
          />
        </Col>
      </Row>
      {(() => {
        if (orderQ && reOrderPonit) {
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
                temp["unitsR"] = orderQ;
                temp["begining"] += parseInt(orderQ);
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
              <tr key={`${i}last`}>
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
              order: temp["Order"],
            });
            temp["Order"] = "No";
            temp["begining"] = temp["Ending"];
            temp["randomNumber"] = "";
            temp["leadTime"] = "";
            temp["unitsR"] = 0;
          }
          console.log(rowResult);
          let AvEnding =
            rowResult
              .map((e) => e.ending)
              .reduce((a, b) => parseInt(a) + parseInt(b), 0) / 10;
          let AvLost =
            rowResult
              .map((e) => e.lost)
              .reduce((a, b) => parseInt(a) + parseInt(b), 0) / 10;
          let AvOrder =
            rowResult.filter((ele) => ele["order"] === "Yes").length / 10;
          return (
            <div>
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
                <tbody>{TableData}</tbody>
              </Table>
              <Alert color="success">
                {`Average ending inventory is ${AvEnding} per day Average lost sales is ${AvLost} per day Average number of orders placed is ${AvOrder} per day`}
              </Alert>
              {orderCost ? (
                <Alert color="success">{`Daily Order Cost is ${parseFloat(
                  (parseFloat(orderCost) * parseFloat(AvOrder)).toFixed(2)
                )}$`}</Alert>
              ) : null}
              {holdCost && year ? (
                <Alert color="success">{`Daily Holding Cost is ${parseFloat(
                  (
                    (parseFloat(holdCost) / parseFloat(year)) *
                    parseFloat(AvEnding)
                  ).toFixed(2)
                )}$`}</Alert>
              ) : null}
              {lostCost ? (
                <Alert color="success">{`Daily stockout cost is ${parseFloat(
                  (parseFloat(lostCost) * parseFloat(AvLost)).toFixed(2)
                )}$`}</Alert>
              ) : null}
              {orderCost && holdCost && lostCost ? (
                <Alert color="success">{`Total daily inventory cost is ${parseFloat(
                  (
                    parseFloat(orderCost) * parseFloat(AvOrder) +
                    (parseFloat(holdCost) / parseFloat(year)) *
                      parseFloat(AvEnding) +
                    parseFloat(lostCost) * parseFloat(AvLost)
                  ).toFixed(2)
                )}`}</Alert>
              ) : null}
              <Button outline color="primary" onClick={getFSumForL}>
                Try Again?
              </Button>
            </div>
          );
        }
      })()}
    </div>
  );
};

export default Table4;
