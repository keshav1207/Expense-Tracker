import {useForm} from 'react-hook-form';
import { useCreateTransactionMutation } from '../redux/api';
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from 'react-router-dom';


export default function CreateExpenseForm(){

    const { userId } = useParams();
    const [createTransaction] = useCreateTransactionMutation();
    const {register,handleSubmit,reset} = useForm();
    const onSubmit = async (formData)=>{
        if(formData){
        try {
            console.log(formData);
            const data = await createTransaction({userId: userId,userData:formData}).unwrap();
            console.log(data);
            toast.success("Transaction Created Successfully!", {
                position: "top-center",
              });
           
        } catch (error) {
            console.error('Failed to create transaction:', error);
            toast.error("Error! Please try again", {
                position: "top-center",
              });
        }
            
        }
       
        reset();
    }

    console.log(userId);
    return(
        
        <form className="create-expense-form" onSubmit={handleSubmit(onSubmit)}>

            
            <input type="text" placeholder="Rent, Gym membership, Presto top up"  {...register('name')} />
            <select {...register('category')}>
                <option value= "1">Rent</option>
                <option value="2">Eating-out</option>
                <option value="3">Transport</option>
                <option value="4">Utilities</option>
                <option value="5">Mobile Phone</option>
                <option value="6">Groceries</option>
                <option value="7">Fitness</option>
                <option value="8">Shopping</option>
            </select>
            <input type="text" placeholder="$200" {...register('amount')} />
            <input type="date" {...register('date')} />
            <button id='addTransaction' type="submit">Add</button>


        </form>
        
    )
}