import React from "react"
import { connect } from "../src/reduxxx"

function counterReducer(state = 0, action: any) {
	switch (action.type) {
		case "increment":
			return state + 1
		case "decrement":
			return state - 1
		default:
			return state
	}
}

export function Counter({ count, dispatch }) {
	return (
		<div>
			<button onClick={() => dispatch({ type: "decrement" })}>-</button>
			<span>{count}</span>
			<button onClick={() => dispatch({ type: "increment" })}>+</button>
		</div>
	)
}

export let CounterContainer = connect(
	{ counter: counterReducer },
	function mapStateToProps(state: any) {
		return { count: state.counter }
	},
)(Counter)
