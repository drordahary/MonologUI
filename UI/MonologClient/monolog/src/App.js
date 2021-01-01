import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import './App.css';
import MyRouter from './Router';
import { ConfigProvider } from "./ConfigContext";

const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const defaultConfigurations = {
    srcIP: "127.0.0.1",
    dstIP: "127.0.0.1",
    portOffset: 50000,
    portsPerChannel: 10,
    bufferSize: 512,
    timesToSend: 1
  };

  const [configs, setConfigs] = useState(defaultConfigurations);
  const providerOptions = {
    data: configs,
    changeConfigs: (values) => setConfigs(values)
  };

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(socketIOClient(ENDPOINT));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <ConfigProvider value={providerOptions}>
          <MyRouter socket={socket} />
        </ConfigProvider>
      </header>
    </div>
  );
}

export default App;
