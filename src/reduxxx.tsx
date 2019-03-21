import * as Redux from "redux"
import * as ReactRedux from "react-redux"
import nanoid from "nanoid"

let STORE_KEY = "@@ReduxxxStore"
let REDUCERS_KEY = "@@ReduxxxReducers"
let KEY_KEY = "@@ReduxxxKey"

let DEFAULT_REDUCER = (state = {}) => state

export function createStore(enhancer?: any) {
	let state: any = {}
	let store = Redux.createStore(DEFAULT_REDUCER, state, enhancer)
	state[STORE_KEY] = store
	state[REDUCERS_KEY] = {
		[STORE_KEY]: DEFAULT_REDUCER,
		[REDUCERS_KEY]: DEFAULT_REDUCER,
	}
	return store
}

export function connect(
	reducers: any,
	mapStateToProps?: any,
	mapDispatchToProps?: any,
	mergeProps?: any,
	options: any = {},
): any {
	return ReactRedux.connect(
		(state: any, ownProps: any) => {
			updateReducers(state[STORE_KEY], state[REDUCERS_KEY], reducers)

			let selectedState: any = {}

			for (let key of Object.keys(reducers)) {
				selectedState[key] = state[reducers[key][KEY_KEY]]
			}

			return mapStateToProps(selectedState, ownProps)
		},
		mapDispatchToProps,
		mergeProps,
		options,
	)
}

function updateReducers(store: any, reducers: any, newReducers: any) {
	let changed = false

	for (let key of Object.keys(newReducers)) {
		let reducer = newReducers[key]

		if (!reducer[KEY_KEY]) {
			reducer[KEY_KEY] = reducer.name + "-" + nanoid()
		}

		if (reducers[reducer[KEY_KEY]] === undefined) {
			reducers[reducer[KEY_KEY]] = reducer
			changed = true
		}
	}

	if (changed) {
		store.replaceReducer(Redux.combineReducers(reducers))
	}

	return changed
}
