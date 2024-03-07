import { useEffect  } from "react";

import WorkoutDetails from '../components/WorkoutDetails'
import AddWorkoutForm from "../components/AddWorkoutForm";
import { useWorkoutsContext } from "../Hooks/useWorkoutsContext";
import { useAuthContext } from "../Hooks/useAuthContext";

const Home = () => {

    const {workouts , dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()

    useEffect(()=>{
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts',{
                headers: {
                    'authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_WORKOUTS' , payload: json})
            }
        }
        if(user){
        fetchWorkouts()
        }

    },[dispatch,user])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map(workout=>(
                    <WorkoutDetails key = {workout._id} workout = {workout}/>
                ))}
                {/* {!workouts && <div className="no-workouts">OOPS! You haven't added any workouts yet!</div>} */}
            </div>
            <AddWorkoutForm/>
        </div>
      );
}
 
export default Home;