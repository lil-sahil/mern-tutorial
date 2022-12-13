import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import goalService from './goalService'



const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Add goal
export const addGoal = createAsyncThunk('goal/add', async (textData, thunkAPI) => {
    try {
        const userData = await thunkAPI.getState().auth.user

        return await goalService.addGoal(textData, userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


// Get goal
export const getGoals = createAsyncThunk('goals/getAll', async(_, thunkAPI) => {
    try {
        const userToken = await thunkAPI.getState().auth.user.token

        return await goalService.getGoals(userToken)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


// Delete goal.
export const deleteGoal = createAsyncThunk('goal/delete', async (goalId, thunkAPI) => {
    try {
        const userToken = await thunkAPI.getState().auth.user.token

        return await goalService.deleteGoal(goalId, userToken)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => {
            state.goals = []
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(addGoal.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals.push(action.payload)
        })
        .addCase(addGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getGoals.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getGoals.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals = action.payload
        })
        .addCase(getGoals.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deleteGoal.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals = state.goals.filter(goal => goal._id != action.payload.id)
        })
        .addCase(deleteGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})



export const {reset} = goalSlice.actions
export default goalSlice.reducer