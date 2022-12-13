import axios from 'axios'

const API_URL = '/api/goals/'


//  Add Goal
const addGoal = async (textData, userData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${userData.token}`
        }
    }

    const response = await axios.post(API_URL, textData, config)
    return response.data
}

// Get all goals
const getGoals = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)
    return response.data
}

// Delete goals
const deleteGoal = async (goalId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(`${API_URL}${goalId}`, config)
    return response.data
}


const goalService = {
    addGoal,
    getGoals,
    deleteGoal
}



export default goalService