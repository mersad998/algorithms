import React, { useMemo } from "react";
import './App.css'
import { solve15puzzle } from "./resolve";

export default function App() {

  const initialModel = [
    [1, 3],
    [0, 2],

  ]
  // const initialModel = [
  //   [1, 2, 14, 4],
  //   [5, 12, 7, 8],
  //   [9, 10, 11, 6],
  //   [13, 3, 15, 0]
  // ]

  const xx = useMemo(() => {
    console.log('solve15puzzle(initialModel): ', solve15puzzle(initialModel));
  }, [])

  console.log('xx: ', xx);

  return (
    <div className="container" style={{ display: 'flex', flex: 1, background: 'gray', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: 520, height: 520, background: 'darkGray' }}>
        {initialModel.map(number => {
          return <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {number.map(number => {
              return <div style={{ width: 120, height: 120, background: 'white', margin: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {number}
              </div>
            })}
          </div>
        })}
      </div>
    </div>
  );
}
