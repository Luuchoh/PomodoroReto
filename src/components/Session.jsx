import moment from "moment";
import React from "react";

const Session = ({
  sessionLength, // this is where we accept the props
  incrementSessionLengthByOneMinute,
  decrementSessionLengthByOneMinute,
}) => {
  const sessionLengthInMinutes = moment.duration(sessionLength, "s").minutes();

  return (
    <div className="text-center">
      <p className="fw-bold" id="session-label">
        Sesion
      </p>
      <div className="w-100 text-center">
        <p className="w-25 border border-dark rounded mx-auto" id="session-length">{sessionLengthInMinutes}</p>
      </div>
      <button
        className="btn btn-dark mx-2"
        id="session-increment"
        onClick={incrementSessionLengthByOneMinute}
      >
        +
      </button>
      <button
        className="btn btn-dark mx-2"
        id="session-decrement"
        onClick={decrementSessionLengthByOneMinute}
      >
        -
      </button>
    </div>
  );
};
export default Session;
