import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addGoal } from '../../features/goals/goalSlice'


const GoalForm = () => {

  const [text, setText] = useState("")

  const dispatch = useDispatch()

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(addGoal({text}))
  }



  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input type='text' name='text' id='text' value ={text} onChange={(e) => setText(e.target.value)}></input>
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add Goal
          </button>
        </div>
      </form>
    </section>
  )
}

export default GoalForm