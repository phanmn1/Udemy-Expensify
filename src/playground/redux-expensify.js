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


const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
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
        default: 
            return state
    }
}

// Store creation 
const store = createStore(combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
}))

store.subscribe(() => {
    console.log(store.getState())
})

const expenseOne = store.dispatch(addExpense({description: 'Rent', amount: 100}))
const expenseTwo = store.dispatch(addExpense({description: 'Coffee', amount: 300}))

store.dispatch(removeExpense({id: expenseOne.expense.id}))

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

const user = {
    name: 'Jen',
    age: 24
}

console.log({
    ...user
})
