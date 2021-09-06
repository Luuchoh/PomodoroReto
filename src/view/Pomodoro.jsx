import React, { useEffect, useRef, useState } from "react";
import Break from "../components/Break";
import Session from "../components/Session";
import TimeLeft from "../components/TimeLeft";

const Pomodoro = () => {
  //
  const audioElement = useRef(null);
  // ESTADO PARA EL RELOG PRINCIPAL
  const [sessionLength, setSessionLength] = useState(60 * 25);
  // ESTADO PARA LOS BREAKS DEL RELOG PRINCIPAL
  const [breakLength, setBreakLength] = useState(60 * 5);
  //ESTADO PARA LA TITULO DE ACTIVIDAD ACTUAL
  const [sesionActual, setSesionActual] = useState("Sesion");
  //ESTADO PARA COMENZAR EL CONTEO HACIA ATRAS Y PARAR EL RELOG DE LA ACTIVIDAD ACTUAL
  const [intervalo, setIntervalo] = useState(null);
  //ESTADO PARA MOSTRAR EL TIEMPO DEL RELOG DE LA ACTIVIDAD ACTUAL
  const [timeLeft, setTimeLeft] = useState(sessionLength);

  //EFFECT CON DEPENDENCIA
  useEffect(() => {
    setTimeLeft(sessionLength);
  }, [sessionLength]);

  const decrementBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength - 60;
    if (newBreakLength <= 0) {
      setBreakLength(0);
    } else {
      setBreakLength(newBreakLength);
    }
  };

  const incrementBreakLengthByOneMinute = () =>
    setBreakLength(breakLength + 60);

  const decrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength - 60;
    if (newSessionLength <= 0) {
      setSessionLength(0);
    } else {
      setSessionLength(newSessionLength);
    }
  };
  const incrementSessionLengthByOneMinute = () =>
    setSessionLength(sessionLength + 60);

  //devuelve un boleano para verificar si hay data en el estado
  const isStarted = intervalo != null;
  //evento para poner la sesion en marcha (el relog va hacia atras)
  const handleStartStop = () => {
    if (isStarted) {
      clearInterval(intervalo);
      setIntervalo(null);
    } else {
      setIntervalo(
        setInterval(() => {
          setTimeLeft((prevTimeLeft) => {
            const newbreak = prevTimeLeft - 1;
            if (newbreak >= 0) {
              return prevTimeLeft - 1;
            }
            //AUN SIGUE EN CERO POR ENDE DEBE MANDAR EL SONIDO DE ALARMA
            audioElement.current.play();
            //VERIFICA EL ESTADO ACTUAL DE LA ACTIVIDAD ACTUAL PONE EL NOMBRE
            // Y EL TIEMPO QUE TIENE EL ESTADO EN ESE MOMENTO
            if (sesionActual === "Sesion") {
              setSesionActual("Break");
              setTimeLeft(breakLength);
            } else if (sesionActual === "Break") {
              setSesionActual("Sesion");
              setTimeLeft(sessionLength);
            }
          });
        }, 1000)
      );
    }
  };

  const handleResetButton = () => {
    // REINICIA VALORES POR DEFECTO
    audioElement.current.load();
    clearInterval(intervalo);
    setIntervalo(null);
    setSesionActual("Sesion");
    setSessionLength(60 * 25);
    setBreakLength(60 * 5);
    setTimeLeft(60 * 25);
  };

  return (
    <div className="App container vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100">
        <div className="col-6 mb-4">
          <Break
            breakLength={breakLength}
            incrementBreakLengthByOneMinute={incrementBreakLengthByOneMinute}
            decrementBreakLengthByOneMinute={decrementBreakLengthByOneMinute}
          />
        </div>
        <div className="col-6 mb-4">
          <Session
            sessionLength={sessionLength}
            incrementSessionLengthByOneMinute={
              incrementSessionLengthByOneMinute
            }
            decrementSessionLengthByOneMinute={
              decrementSessionLengthByOneMinute
            }
          />
        </div>
        <div className="col-10 m-auto text-center mt-4">
          <TimeLeft
            timerLabel={sesionActual}
            timeLeft={timeLeft}
            handleStartStop={handleStartStop}
            buttonStartStop={isStarted ? "Stop" : "Start"}
            buttonColor={isStarted ? "danger" : "dark"}
          />

          <button
            className="btn btn-dark mx-2 py-2 px-5"
            id="reset"
            onClick={handleResetButton}
          >
            Reset
          </button>
          <audio id="beep" ref={audioElement}>
            <source
              src="https://mus7.about-in.tk/skm/eb5ba693-2d2f-42c5-9cc8-5aa96994a867.mp3"
              type="audio/mp3"
            />
          </audio>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
