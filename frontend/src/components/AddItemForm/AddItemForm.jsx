import React from 'react';
import useAuth from '../../hooks/useAuth';

const AddItemForm = ({garageSale}) => {
    
    const [user,token] = useAuth();
    console.log(garageSale.name)
    console.log(user.id)

    return garageSale.user_id===user.id && ( <form >
        <h1>test</h1>


    </form> );
}
 
export default AddItemForm;