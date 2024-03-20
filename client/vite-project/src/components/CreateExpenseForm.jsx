import {useForm} from 'react-hook-form';
import { useCreateTransactionMutation } from '../redux/api';


export default function CreateExpenseForm(){
    const [createTransaction] = useCreateTransactionMutation();
    


    const {register,handleSubmit,reset} = useForm();
    const onSubmit = async (formData)=>{
        console.log(formData);
        if(formData){
            const data = await createTransaction(formData).unwrap();
            console.log(data);
        }
       
        reset();
    }
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
            <button type="submit">Add</button>


        </form>
        
    )
}