import { useState } from 'react'
import PasswordChanger from './components/PasswordChanger'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PasswordChanger/>
    </>
  )
}

export default App
