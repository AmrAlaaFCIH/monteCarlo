import React, { useContext } from "react";
import { Table, Input, Button } from "reactstrap";
import { AppContext } from "../contextAPI/appContext";

const Table3 = () => {
  const {
    rowsForL,
    getRowNumberForL,
    onInputChangeDForL,
    leadTime,
    FrequencyForL,
    onInputChangeFForL,
    getFSumForL,
    probForL,
    cumForL,
    randomNumbersForL
  } = useContext(AppContext);
  return (
    <div>
      <Input
        placeholder="Enter Number Of Rows for Lead Time ..."
        type="number"
        name="rowForL"
        onChange={getRowNumberForL}
        value={rowsForL}
      />
      {rowsForL ? (
        <div>
          <Table borderless hover>
            <thead>
              <tr>
                <th>LeadTime</th>
                <th>Frequency</th>
                <th>P{"ROBABILITY".toLowerCase()}</th>
                <th>C{"UMULATIVE".toLowerCase()}</th>
                <th>Number-Range</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                let eleArray = [];
                for (let i = 1; i <= rowsForL; i++) {
                  eleArray.push(
                    <tr key={`${i}tr3`}>
                      <td className="inputter">
                        <Input
                          type="number"
                          name={`l${i}`}
                          onChange={onInputChangeDForL}
                          value={leadTime[`l${i}`]}
                        />
                      </td>
                      <td className="inputter">
                        <Input
                          type="number"
                          name={`f${i}`}
                          onChange={onInputChangeFForL}
                          value={FrequencyForL[`f${i}`]}
                        />
                      </td>
                      <td>{probForL ? probForL[i - 1] : null}</td>
                      <td>{cumForL ? cumForL[i - 1] : null}</td>
                      <td>
                        {randomNumbersForL[i - 1]
                          ? `${randomNumbersForL[i - 1][0]} to ${
                              randomNumbersForL[i - 1][
                                randomNumbersForL[i - 1].length - 1
                              ]
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
          <Button outline color="primary" onClick={getFSumForL}>
            Get Result
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Table3;
