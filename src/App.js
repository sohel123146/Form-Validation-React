import './App.css';
import Form from './Components/LoginForm.js';
import {useState} from 'react'


function App() {
  const [mode,setMode] = useState('light')

  const toggledarkmode = () =>
  {
    if(mode === 'light')
    {
      setMode('dark')
      document.body.style.backgroundColor = '#040436'
    }
  }
  const togglelightmode = () =>
  {
    if(mode === 'dark')
    {
      setMode('light')
      document.body.style.backgroundColor = 'white'
    }
  }


  return (
    <Form mode={mode} toggledarkmode={toggledarkmode} togglelightmode={togglelightmode}/>
  );
}

export default App;
