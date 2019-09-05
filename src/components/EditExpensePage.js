import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
import { removeExpense } from '../actions/expenses'
import { editExpense } from '../actions/expenses'

const EditExpensePage = (props) => {

    return (
        <div>
        <ExpenseForm
            expense = {props.expense}
            onSubmit={(expense) => {
                //Make sure that data constains the ID. Go to props 
                //To make sure you have it
                props.dispatch(editExpense(props.expense.id, expense))
                console.log('updated', expense)
                props.history.push('/')
            }}
            />
         <button onClick={() => {
           //Remove expense expects object 
           props.dispatch(removeExpense({ id: props.expense.id}))
           props.history.push('/')
       }}>Remove</button>
    </div>
    )
}

const mapStateToProps = (state, props) => {
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    }
}

export default connect(mapStateToProps)(EditExpensePage)