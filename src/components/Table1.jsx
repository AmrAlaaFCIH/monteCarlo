import React, { useContext } from "react";
import { Table, Input } from "reactstrap";
import { AppContext } from "../contextAPI/appContext";

const Table1 = () => {
  const {
    rows,
    onInputChangeD,
    demands,
    onInputChangeF,
    Frequency,
    prob,
    cum,
    randomNumbers,
  } = useContext(AppContext);
  return (
    <Table borderless hover>
      <thead>
        <tr>
          <th>Demand</th>
          <th>Frequency</th>
          <th>P{"ROBABILITY".toLowerCase()}</th>
          <th>C{"UMULATIVE".toLowerCase()}</th>
          <th>Number-Range</th>
        </tr>
      </thead>
      <tbody>
        {(() => {
          let eleArray = [];
          for (let i = 1; i <= rows; i++) {
            eleArray.push(
              <tr key={`${i}tr`}>
                <td className="inputter">
                  <Input
                    type="number"
                    name={`d${i}`}
                    onChange={onInputChangeD}
                    value={demands[`d${i}`]}
                  />
                </td>
                <td className="inputter">
                  <Input
                    type="number"
                    name={`f${i}`}
                    onChange={onInputChangeF}
                    value={Frequency[`f${i}`]}
                  />
                </td>
                <td>{prob ? prob[i - 1] : null}</td>
                <td>{cum ? cum[i - 1] : null}</td>
                <td>
                  {randomNumbers[i - 1]
                    ? `${randomNumbers[i - 1][0]} to ${
                        randomNumbers[i - 1][randomNumbers[i - 1].length - 1]
                      }`
                    : null}
                </td>
              </tr>
            );
          }
          return eleArray;
        })()}
      </tbody>
    </Table>
  );
};

export default Table1;
