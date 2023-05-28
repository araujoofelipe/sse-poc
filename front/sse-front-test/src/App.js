import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [data,setData] = useState(0)
  useEffect(() => {
    const source = new EventSource(`http://localhost:3001/sse`);

    source.addEventListener('open', () => {
      console.log('SSE opened!');
    });

    source.addEventListener('message', (e) => {
      console.log(e.data);
      const response = JSON.parse(e.data)
      setData(response.date);
      console.log(data)
    });

    source.addEventListener('error', (e) => {
      console.error('Error: ',  e);
    });

    return () => {
      source.close();
    };
  }, []);
  return (
    <div className="App">
      <h1> Mensagens SSE</h1>
      {data}

    </div>
  );
}

export default App;
