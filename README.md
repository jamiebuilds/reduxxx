# Reduxxx

> Redux, explicit.

- Eliminates the implicit dependencies in your Redux app
- Makes it easier to code-split your Redux code
- Makes it easier to co-locate your Redux code with your components
- Makes it easier to put your Redux code into npm packages
- Provides an easier migration path towards React Hooks
- Makes your Redux code more "component-oriented"

> **Note:** This project is designed as a suggested API change to Redux itself.
> It intentionally changes very little about the Redux API.

## Install

```sh
npm install --save reduxxx
```

## Usage

Replace your Redux `createStore()` with Reduxxx's `createStore()`:

```js
import { Provider } from "redux"
import { createStore } from "reduxxx"

let store = createStore()

<Provider store={store}>
  <App/>
</Provider>
```

Replace your React Redux `connect()` with Reduxxx's `connect()`:

```js
import { connect } from "reduxxx"

let CounterContainer = connect(
	{ counter: counterReducer },
	function mapStateToProps(state) {
		return { count: state.counter }
	},
)(Counter)
```

## Motivation

In (most) Redux apps, you have a setup like this:

```js
import { createStore, combineReducers } from "redux"
import { Provider, connect } from "react-redux"

function counterReducer(state = 0, action) {
	// ...
}

function Counter({ count, dispatch }) {
	return <div>...</div>
}

function mapStateToProps(state) {
	return { count: state.counter }
}

let CounterContainer = connect(mapStateToProps)(Counter)

let store = createStore(
	combineReducers({
		counter: counterReducer,
	}),
)

render(
	<Provider store={store}>
		<CounterContainer />
	</Provider>,
	window.root,
)
```

Notice two parts in particular:

```js
function mapStateToProps(state) {
	return { count: state.counter }
}

// ...

let store = createStore(
	combineReducers({
		counter: counterReducer,
	}),
)
```

Notice how we have access to `state.counter` in our Component's
`mapStateToProps()` because we are implicitly depending on `counterReducer`
being added to the store under the name `counter`.

Note that these are usually not in the same file. Your reducers are generally
added to your store in a root `app.js` or `configureStore.js` file, where your
`connect()` code is littered throughout your app wherever your components are.

Having such a huge implicit relationship is a weird part of the Redux API, and
it causes some problems.

For example, code splitting is not the default for most Redux code. It generally
requires a fair bit of setting up, and that's not always easy to do.

There's also the problem "How the heck do we put Redux code inside of an npm
package?" There's no easy answer, and generally it requires consumers of the
npm package to do a lot of setup work to get your package running.

By switching it so that `connect()` is explicit about which reducers it depends
on, and automatically adding reducers to your store (instead of passing them
directly into `createStore()`) we solve these problems and more.
