import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutsContext"

export const useLogout = () =>{
    const { dispatch} = useAuthContext()
    const { dispatch : workoutDispatch} = useWorkoutsContext()

    const logOut = () => {
        //removinf the token from the browser
        localStorage.removeItem('user')
        //dispatch logout action
        dispatch({type:'LOGOUT'})
        workoutDispatch({type:'SET_WORKOUTS' , payload: null})
    }

    return {logOut}
}