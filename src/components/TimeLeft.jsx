import React from "react";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";

momentDurationFormatSetup(moment);

const TimeLeft = ({
  timerLabel,
  timeLeft,
  handleStartStop,
  buttonStartStop,
  buttonColor,
}) => {
  //formateo de tiempo de sesion o relog principal en minutos con segundos
  const formattedTimeLeft = moment
    .duration(timeLeft, "s")
    .format("mm:ss", { trim: false });

  return (
    <div className="text-center" id="container-sesion-actual">
      <p className="fw-bold" id="timer-label">{timerLabel}</p>

      <p className="w-25 border border-dark rounded mx-auto py-3 bg-light" id="time-left">{formattedTimeLeft}</p>
      <button className={`btn btn-${buttonColor} my-2 py-2 px-5`} id="start_stop" onClick={handleStartStop}>
          {buttonStartStop}
      </button>
    </div>
  );
};
export default TimeLeft;
