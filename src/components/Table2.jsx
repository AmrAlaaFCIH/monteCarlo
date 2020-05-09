import React, { useContext } from "react";
import { Table } from "reactstrap";
import { AppContext } from "../contextAPI/appContext";

const Table2 = () => {
  const { simSum, expected, random, sim } = useContext(AppContext);
  return (
    <div>
      <p>Ten days simulation</p>
      <p>
        {`simulated Average daily demand is ${
          simSum / 10
        } and expected daily demand is ${expected}`}{" "}
        and You Can Try Again
      </p>
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
