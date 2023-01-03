import React from "react";
import './App.css'

export default function App() {

  const initialModel = [
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,null]
  ]

  // resolve 8puzzle with backtracking
  const resolve = (model) => {
    const empty = findEmpty(model)
    const emptyX = empty[0]
    const emptyY = empty[1]
    const moves = getMoves(emptyX, emptyY)
    for (let i = 0; i < moves.length; i++) {
      const move = moves[i]
      const moveX = move[0]
      const moveY = move[1]
      const newModel = swap(model, emptyX, emptyY, moveX, moveY)
      if (isResolved(newModel)) {
        return newModel
      }
      const result = resolve(newModel)
      if (result) {
        return result
      }
    }
    return null
  }

  const findEmpty = (model) => {
    for (let i = 0; i < model.length; i++) {
      for (let j = 0; j < model[i].length; j++) {
        if (model[i][j] === null) {
          return [i, j]
        }
      }
    }
    return null
  }

  const getMoves = (x, y) => {
    const moves = []
    if (x > 0) {
      moves.push([x - 1, y])
    }
    if (x < 3) {
      moves.push([x + 1, y])
    }
    if (y > 0) {
      moves.push([x, y - 1])
    }
    if (y < 3) {
      moves.push([x, y + 1])
    }
    return moves
  }

  const swap = (model, x1, y1, x2, y2) => {
    const newModel = JSON.parse(JSON.stringify(model))
    const temp = newModel[x1][y1]
    newModel[x1][y1] = newModel[x2][y2]
    newModel[x2][y2] = temp
    return newModel
  }

  const isResolved = (model) => {
    let count = 1
    for (let i = 0; i < model.length; i++) {
      for (let j = 0; j < model[i].length; j++) {
        if (model[i][j] !== count) {
          return false
        }
        count++
      }
    }
    return true
  }

  const resolvedModel = resolve(initialModel)
  console.log('resolvedModel: ', resolvedModel);




  return (
    <div className="container" style={{display:'flex',flex:1, background:'gray', justifyContent:'center',alignItems:'center'}}>
      <div style={{display:'flex',flexDirection:'column', width:520,height:520, background:'darkGray'}}>
        {initialModel.map(number=>{
          return <div style={{display:'flex',flex:1, justifyContent:'center',alignItems:'center'}}>
            {number.map(number=>{
              return <div style={{width:120,height:120, background:'white', margin:5, display:'flex',justifyContent:'center',alignItems:'center'}}>
                {number}
              </div>
            })}
          </div>
        })}
      </div>
    </div>
  );
}
