import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button';
import {Signup} from './components/custom/Signup'
import {Signin} from './components/custom/Signin'
import {Send} from './components/custom/Send'

function App() {
 const [count, setCount] = useState(0)
 return (
   <>
    <Send/>
   </>
 )
}

export default App

