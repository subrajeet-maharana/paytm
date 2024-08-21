import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button';

function App() {
 const [count, setCount] = useState(0)
 return (
   <>
     <Button>Secondary</Button> <br /><br />
     <Button variant="destructive">Here</Button> <br /><br />
     <Button variant="secondary">Secondary</Button> <br /><br />
     <Button variant="ghost">Secondary</Button> <br /><br />
   </>
 )
}

export default App

