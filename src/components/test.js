import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URL = 'https://jsonplaceholder.typicode.com/users';

const Test = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        // Add code here to fetch some users with axios and the URL variable
        const res = async () => {
            const {data} = await axios.get(URL)
            setUsers(data)
        }
        res()
        // then update the 'users' piece of state
        
        
    }, []);
     
    const renderedUsers = users.map((user) => {
        return <li key={user.id}>{user.name}</li>;
    });
    
    return (
        <ul>
            {renderedUsers}
        </ul>
    );
}

export default Test;
