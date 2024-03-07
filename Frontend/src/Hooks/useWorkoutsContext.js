import { WorkoutsContext } from "../context/WorkoutContext";
import { useContext } from "react";


export const useWorkoutsContext = ()=>{
    const context = useContext(WorkoutsContext)

    if(!context){
        throw Error('useWorkoutsContext must be used insde an WorkoutCOntextProvider and this must wrap the root component')
    }

    return context
}