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



// Get Goal

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(addGoal.pending, (state) => {
            state.isLoading = true
        })
        .addCase(addGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(addGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})



export const {reset} = goalSlice.actions
export default goalSlice.reducer