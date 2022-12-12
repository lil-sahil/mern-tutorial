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


const goalService = {
    addGoal
}



export default goalService