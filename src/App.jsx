import { useState } from 'react'
import './App.css'
import { startingBag, randomToken } from './gameLogic'

function App() {
  //state for player bag
  const [bag, setBag] = useState([...startingBag])
  //state for cauldron to hold chips
  const [cauldron, setCauldron] = useState([])
  
  //variable to hold last chip drawn from cauldron
  const lastChip = cauldron.at(-1)

  //variable for white token value count
  const totalWhites = cauldron.reduce((total, token) => total + (token.colour === "white" ? token.value : 0), 0)

  //deconstruct chip and the new bag with the chip taken out, set the player bag and the last chip drawn
  const handleDraw = () => {
    //don't draw from an empty bag
    if (bag.length === 0) return

    //destructuring randomToken
    const {chip, newBag} = randomToken(bag)
    console.log(chip, newBag)

    setBag(newBag)
    setCauldron([...cauldron, chip])
  }

  return (
    <>
      <h1>Quacks</h1>

      <p>Chips in bag: {bag.length}</p>
      <button onClick={handleDraw}>Draw</button>
      {lastChip && <p>Drawn Chip: {lastChip.colour}, {lastChip.value}</p>}

      <p>Chips in cauldron: {cauldron.length}</p>
      <p>Boomberry Sum: {totalWhites}</p>
      <ul>
        {cauldron.map((token, i) => (
          <li key={i}>{token.colour}, {token.value}</li>
        ))}
      </ul>
    </>
  )
}

export default App
