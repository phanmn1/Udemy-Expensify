import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { addExpense, editExpense, removeExpense } from './actions/expenses'
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate} from './actions/filters';
import VisibleExpense from './selectors/expenses';
import './styles/styles.scss'
import 'normalize.css/normalize.css'

const store = configureStore();

// addExpense -> Water bill
// addExpense -> Gas Bill 
// setTextFilter -> bill 
// getVisibleExpenses -> print visible ones to screen
store.dispatch(addExpense({ description: 'Water Bill', amount: 4500 }))
store.dispatch(addExpense({ description: 'Gas Bill', createdAt: 1000 }))
store.dispatch(addExpense({ description: 'Rent', amount: 109500}))


// store.dispatch(setTextFilter('water'))

// setTimeout(() => {
//     store.dispatch(setTextFilter('bill'))
// }, 3000)

const state = store.getState()
const VisibleExpenses = VisibleExpense(state.expenses, state.filters)

console.log(VisibleExpenses)

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'))

