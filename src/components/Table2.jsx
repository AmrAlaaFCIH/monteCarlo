import React, { useContext } from "react";
import { Table , Alert } from "reactstrap";
import { AppContext } from "../contextAPI/appContext";

const Table2 = () => {
  const { simSum, expected, random, sim } = useContext(AppContext);
  return (
    <div>
      <Alert color="success">
        {`simulated Average daily demand for 10 days is ${
          simSum / 10
        } and expected daily demand is ${expected}`}{" "}
        and You Can Try Again
      </Alert>
      <Table hover>
        <thead>
          <tr>
            <th>Day</th>
            <th>Random Number</th>
            <th>Simulated demand</th>
          </tr>
        </thead>
        <tbody>
          {(() => {
            let arr = [];
            for (let i = 1; i <= 10; i++) {
              arr.push(
                <tr key={`${i}tr2`}>
                  <td>{i}</td>
                  <td>{random[i - 1]}</td>
                  <td>{sim[i - 1]}</td>
                </tr>
              );
            }
            return arr;
          })()}
        </tbody>
      </Table>
    </div>
  );
};
export default Table2;
