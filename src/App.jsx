import { useState } from 'react'
import './App.css'
import { startingBag, randomToken } from './gameLogic'
import mainTrack from './data/mainTrack.json'

function App() {
  //state for player bag
  const [bag, setBag] = useState([...startingBag])
  //state for cauldron to hold chips
  const [cauldron, setCauldron] = useState([])
  //state for stopping drawing
  const [stopDrawing, setStopDrawing] = useState(false)
  //state for tracking total vp
  const [totalVP, setTotalVP] = useState(0)
  
  //variable to hold last chip drawn from cauldron
  const lastChip = cauldron.at(-1)

  //variable for white token value count
  const totalWhites = cauldron.reduce((total, token) => total + (token.colour === "white" ? token.value : 0), 0)
  //variable to track explosion
  const exploded = totalWhites > 7

  //deconstruct chip and the new bag with the chip taken out, set the player bag and the last chip drawn
  const handleDraw = () => {
    //don't draw from an empty bag
    if (brewOver) return

    //destructuring randomToken
    const {chip, newBag} = randomToken(bag)

    setBag(newBag)
    setCauldron([...cauldron, chip])
  }

  //disable draw button 
  const handleStopDrawing = () => setStopDrawing(true)

  const handleTotalVP = () => setTotalVP(totalVP + scoringSpace.vp)

  //variable to track droplet space
  const dropletSpace = 0

  //variable for last playable space
  const lastSpace = mainTrack.length - 2

  //compute last chip's start and ensure it doesn't go past lastSpace and also take lastTokenPosition and use it as scoring space after last placed token position
  const rawPosition = cauldron.reduce((total, token) => total +  token.value, dropletSpace)
  const lastTokenPosition = Math.min(rawPosition, lastSpace)
  const scoringIndex = lastTokenPosition + 1
  const isOnLastSpace = lastTokenPosition === lastSpace

  //variable to access mainTrack
  const scoringSpace = mainTrack[scoringIndex]

  //variable for long disable button condition
  const brewOver = stopDrawing || exploded || bag.length === 0 || isOnLastSpace




  return (
    <>
      <h1>Quacks</h1>

      <h2>Total VP: {totalVP}</h2>
      <button onClick={handleTotalVP}>Add VP</button>

      <p>Chips in bag: {bag.length}</p>
      <button onClick={handleDraw} disabled={brewOver}>Draw</button>
      <button onClick={handleStopDrawing} disabled={brewOver}>Stop</button>
      {lastChip && <p>Drawn Chip: {lastChip.colour}, {lastChip.value}</p>}

      <p>Chips in cauldron: {cauldron.length}</p>

      <p>Boomberry Sum: {totalWhites}</p>
      {exploded && <p>Your cauldron exploded!</p>}
      
      <p>Chip Position: {lastTokenPosition}</p>
      { brewOver && 
        <>
          <p>Money Scored: {scoringSpace.money}</p>
          <p>VP Scored: {scoringSpace.vp}</p>
          <p>Rubies Scored: {scoringSpace.ruby ? "Yes" : "No"}</p>
        </>
      }
      <ul>
        {cauldron.map((token, i) => (
          <li key={i}>{token.colour}, {token.value}</li>
        ))}
      </ul>
    </>
  )
}

export default App
