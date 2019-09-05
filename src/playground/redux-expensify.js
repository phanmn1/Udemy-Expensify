import { createStore, combineReducers } from 'redux'
import uuid from 'uuid'
// ADD_EXPENSE
const addExpense = ( 
    {
        description = '', 
        note = '',
         amount = 0, 
         createdAt = 0
    } = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(), 
        description, 
        note, 
        amount, 
        createdAt
    }
})


const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id, 
    updates
})

const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
})

const setTextFilter = (textFilter = '') => ({
    type: 'SET_TEXT_FILTER',
    textFilter
})

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

const setStartDate = (timestamp = undefined) => ({
    type: 'SET_START_DATE',
    timestamp
})

const setEndDate = (timestamp = undefined) => ({
    type: 'SET_END_DATE',
    timestamp
})

//Expenses Reducer
const expensesReducerDefaultState = []

/*

Spread Operator 

const names = ['Andrew', 'Steve']

[...names] => ['Andrew, 'Steve'] //But it's a different array 
[...names, 'Mike'] => ['Andrew', 'Steve', 'Mike'] 

*/

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch(action.type){
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ]
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id)
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense
                }
            })
        default: 
            return state
    }
}

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined, 
    endDate: undefined
}

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch(action.type){
        case 'SET_TEXT_FILTER':
            return {
                ...state, 
                text: action.textFilter
            }
        case 'SORT_BY_AMOUNT':
            return {
                ...state, 
                sortBy: 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: 'date'
            }
        case 'SET_START_DATE':
            return {
                ...state, 
                startDate: action.timestamp
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.timestamp
            }
        default: 
            return state
    }
}


// Get visible expenses
const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate }) => {

    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate; 
        const endDateMatch = typeof startDate !== 'number' || expense.createdAt <= endDate; 
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase()); 

        return startDateMatch && endDateMatch && textMatch
    }).sort((a, b) => {
        if(sortBy === 'date'){
            return a.createdAt < b.createdAt ? 1 : -1
        } else if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1
        }
    })
}

// Store creation 
const store = createStore(combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
}))

store.subscribe(() => {
    const state = store.getState(); 
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses)
})

const expenseOne = store.dispatch(addExpense({description: 'Rent', amount: 300, createdAt: 1000}))
const expenseTwo = store.dispatch(addExpense({description: 'Coffee', amount: 100, createdAt: 1000}))

// store.dispatch(removeExpense({id: expenseOne.expense.id}))
// store.dispatch(editExpense(expenseTwo.expense.id, {amount: 500 }))

//store.dispatch(setTextFilter('Coffee'))
// store.dispatch(setTextFilter(''))

store.dispatch(sortByAmount()); //amount
//store.dispatch(sortByDate()); //date

//store.dispatch(setStartDate(0))
// store.dispatch(setStartDate())
// store.dispatch(setEndDate(999))

const demoState = {
    expenses: [{
        id: 'aldfjaldjfa', 
        description: 'January Rent',
        note: 'This was the final payment for the address for that address',
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: 'rent', 
        sortBy: 'amount', //date or amount
        startDate: undefined, 
        endDate: undefined
    }
}

