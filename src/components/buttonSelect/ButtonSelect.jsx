import { useState, useEffect } from "react"

export default function ButtonSelect({ amount, setActive, active = 1 }) {
  const renderButtons = () => {
    let buttons = []

    for (let index = 1; index < amount + 1; index++) {
      buttons.push(
        <div
          className={`group relative inline-block overflow-hidden ${
            active === index ? "bg-blue-mid" : "bg-grey-mid-1 "
          } px-8 py-3 focus:outline-none focus:ring ${
            index === 1 ? "rounded-l-lg" : index === 4 ? "rounded-r-lg" : ""
          } cursor-pointer`}
          key={index}
          onClick={() => setActive(index)}>
          {index}
        </div>
      )
    }

    return buttons
  }

  return (
    <div>
      <div>{renderButtons()}</div>
    </div>
  )
}
