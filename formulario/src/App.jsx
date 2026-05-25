import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import FormularioCadastro from './components/FormularioCadastro.jsx'
import Contador from "./components/Contador.jsx"



function App() {
  return (
    <div>
      <h1>Formulario</h1>
      <FormularioCadastro/> 
      <Contador/>
          </div>

  )
}

export default App