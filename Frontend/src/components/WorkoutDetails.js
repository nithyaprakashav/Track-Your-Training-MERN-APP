import { useWorkoutsContext } from "../Hooks/useWorkoutsContext"
//date-fns

import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from "../Hooks/useAuthContext"

const WorkoutDetails = ({workout }) => {

    const{user} = useAuthContext()
    const {dispatch} = useWorkoutsContext()

    const handleClick =async ()=>{

        if(!user){
            return
        }
        
        const response = await fetch(`/api/workouts/${workout._id}`,{
            method:'DELETE',
            headers:{'authorization': `Bearer ${user.token}`}
        })
        const json =await response.json()
        if(response.ok){
            dispatch({type:'DELETE_WORKOUT' , payload: json})
        }
    }


    return(
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Number of Sets : </strong>{workout.sets}</p>
            <p><strong>Number of Reps : </strong>{workout.reps}</p>
            <p><strong>Load (in Kilograms) : </strong>{workout.sets}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt),{addSuffix: true})}</p>
            <span onClick={handleClick} className="material-symbols-outlined">delete</span>
        </div>
    )
}
export default WorkoutDetails