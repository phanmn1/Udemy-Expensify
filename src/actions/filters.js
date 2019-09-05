export const setTextFilter = (textFilter = '') => ({
    type: 'SET_TEXT_FILTER',
    textFilter
})

export const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})

export const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})

export const setStartDate = (timestamp = undefined) => ({
    type: 'SET_START_DATE',
    timestamp
})

export const setEndDate = (timestamp = undefined) => ({
    type: 'SET_END_DATE',
    timestamp
})