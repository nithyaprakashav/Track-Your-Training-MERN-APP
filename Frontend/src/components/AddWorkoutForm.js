import { useState } from "react";
import { useWorkoutsContext } from "../Hooks/useWorkoutsContext";
import { useAuthContext } from "../Hooks/useAuthContext";


const AddWorkoutForm = () => {
    const{dispatch} = useWorkoutsContext()
    const [title , setTitle] = useState('')
    const [sets , setSets] = useState('')
    const [reps , setReps] = useState('')
    const [load , setLoad] = useState('')
    const [error , setError] = useState(null)
    const [emptyFields , setEmptyFields] = useState([])
    const {user} = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            setError('You must be logged in')
            return
        }

        const workout = {title , sets , reps , load}
        const response = await fetch('/api/workouts',{
            'method': 'POST',
            'body':JSON.stringify(workout),
            'headers': {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            setTitle('')
            setSets('')
            setReps('')
            setLoad('')
            setError(null)
            setEmptyFields([])
            console.log('New Workout Added', json)
            dispatch({type: 'CREATE_WORKOUT' , payload: json})
        }
    }

    return ( 
        <form  className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>
            <label>Title of the exercise :</label>
            <input 
            type="text" 
            onChange = {(e)=> setTitle(e.target.value)}
            value = {title}
            className={emptyFields.includes('title') ? 'error' : ''}
            />
            <label>Number of Sets :</label>
            <input 
            type="number" 
            onChange = {(e)=> setSets(e.target.value)}
            value = {sets}
            className={emptyFields.includes('sets') ? 'error' : ''}
            />
            <label>Number of reps :</label>
            <input 
            type="number" 
            onChange = {(e)=> setReps(e.target.value)}
            value = {reps}
            className={emptyFields.includes('reps') ? 'error' : ''}
            />
            <label>Load (in Kilograms) :</label>
            <input 
            type="number" 
            onChange = {(e)=> setLoad(e.target.value)}
            value = {load}
            className={emptyFields.includes('load') ? 'error' : ''}
            />

            <button>Add Workout</button>

            {error && <div className="error">{error}</div>}
        </form>
     );
}
 
export default AddWorkoutForm;