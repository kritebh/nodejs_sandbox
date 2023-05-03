import User from "./User"
import { useEffect } from "react"
import { useSelector,useDispatch } from "react-redux"
import {addUsers} from "../Store/UserSlice"

const Users = ()=>{

    const users = useSelector(store=>store.users.users)
    const dispatch=useDispatch()

    useEffect(()=>{
        getUsers()
    },[])
    
    async function getUsers(){
        let res = await fetch("https://jsonplaceholder.typicode.com/users");
        let json = await res.json()
        dispatch(addUsers(json))
    }

    return (
        <div>
            {
                users?.map(user=>{
                    return <User key={user.id} name={user.name} email={user.email} />
                })
            }
        </div>
    )
}

export default Users