import React from 'react'
import ExpenseListItem from './ExpenseListItem'
import { connect } from 'react-redux'
import selectExpenses from '../selectors/expenses'

const ExpenseList = (props) => (
    <div>
        <h1>Expense List</h1>
        <ul>
        {
            props.expenses.map((expense) => (<ExpenseListItem key={expense.id} {...expense}/>)
                
            )
        }</ul>
    </div>
)

const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    }
}

//Connect returns a function so we have to use the return function to 
//Call the Component to connect to. Inside the first function, 
//return an object on what we want to connect
export default connect(mapStateToProps)(ExpenseList)
