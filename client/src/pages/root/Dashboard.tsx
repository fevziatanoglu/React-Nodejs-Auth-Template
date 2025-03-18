import React from "react"
import useStore from "../../store";


const Dashboard: React.FC = () => {
    const {logoutFetch} = useStore()
    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={()=>logoutFetch()}></button>
        </div>
    )
}

export default Dashboard;