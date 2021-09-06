import React from "react";
import moment from "moment";

const Break = ({
  breakLength,
  incrementBreakLengthByOneMinute,
  decrementBreakLengthByOneMinute,
}) => {

  //CONVIERTE SEGUNDOS EN MINUTOS
  const breakLengthInMinutes = moment
    .duration(breakLength, "s")
    .minutes();

  return (
    <div className="text-center">
      <p className="fw-bold" id="break-label">Break</p>
      <p className="w-25 border border-dark rounded mx-auto" id="break-length">{breakLengthInMinutes}</p>
      <button className="btn btn-dark mx-2" id="break-increment" onClick={incrementBreakLengthByOneMinute}>
        +
      </button>
      <button className="btn btn-dark mx-2" id="break-decrement" onClick={decrementBreakLengthByOneMinute}>
        -
      </button>
    </div>
  );
};

export default Break;
