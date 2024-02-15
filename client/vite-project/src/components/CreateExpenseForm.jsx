import {useForm} from 'react-hook-form';


export default function CreateExpenseForm(){
    const {register,handleSubmit,resetField} = useForm();
    const onSubmit = (data)=>{
        console.log(data);
    }
    return(
        
        <form className="create-expense-form" onSubmit={handleSubmit(onSubmit)}>

            
            <input type="text" placeholder="Rent, Gym membership, Presto top up"  {...register('name')} />
            <select {...register('type')}>
                <option value="Rent">Rent</option>
                <option value="Eating-out">Eating-out</option>
                <option value="Transport">Transport</option>
                <option value="Utilities">Utilities</option>
                <option value="Mobile-Phone">Mobile Phone</option>
                <option value="Groceries">Groceries</option>
                <option value="Fitness">Fitness</option>
                <option value="Shopping">Shopping</option>
            </select>
            <input type="text" placeholder="$200" {...register('amount')} />
            <input type="date" {...register('date')} />
            <button type="submit">Add</button>


        </form>
        
    )
}