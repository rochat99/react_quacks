//describe one chip
//write a js object with relevant info
//colour, name?, cost, value, effect, quantity left?

// let boomberry1 = {
//     colour: "white",
//     value: 1
// };

export const startingBag = [
    {colour: "white", value: 1},
    {colour: "white", value: 1},
    {colour: "white", value: 1},
    {colour: "white", value: 1},
    {colour: "white", value: 2},
    {colour: "white", value: 2},
    {colour: "white", value: 3},
    {colour: "orange", value: 1},
    {colour: "green", value: 1}
];

// let randomToken = startingBag[Math.floor(Math.random()*startingBag.length)]

export const randomToken = (bag) => {
    const index = Math.floor(Math.random()*bag.length);
    return {
        chip: bag[index], 
        newBag: bag.filter((token, i) => i !== index)
    }
}

// const {chip, newBag} = randomToken(startingBag);

// console.log(chip);
// console.log(newBag);

// console.log(startingBag)
// console.log(randomToken(startingBag))