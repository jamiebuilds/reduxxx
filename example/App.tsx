import React from "react"
import { applyMiddleware } from "redux"
import { createStore } from "../src/reduxxx"
import { Provider } from "react-redux"
import { render } from "react-dom"
import { CounterContainer } from "./counter"
import { createLogger } from "redux-logger"

let logger = createLogger()
let store = createStore(applyMiddleware(logger))

render(
	<Provider store={store}>
		<CounterContainer />
	</Provider>,
	document.getElementById("root"),
)
