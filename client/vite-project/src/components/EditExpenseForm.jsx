import { useEffect } from "react";
import { useGetTransactionQuery } from "../redux/api";
import { useUpdateTransactionMutation } from "../redux/api";
import {useForm} from 'react-hook-form';
import {  toast } from "react-toastify";
export default function EditExpenseForm(props){

    const[updateTransaction] = useUpdateTransactionMutation();
     const{data} = useGetTransactionQuery(props.id);
     const {register,handleSubmit,setValue} = useForm();
    
     useEffect(() => {
    // Update productInfo only when data is available
    if (data) {
      setValue('name',data[0].name);
      setValue('amount',data[0].amount);
      setValue('category',data[0].category);
      setValue('date', `${ new Date(data[0].date).toISOString().split('T')[0]}`); 
    }
  }, [data]); 

  
    
  
  const onSubmit = async (updatedData)=>{
      if(updatedData){
      try {
         
          const data = await updateTransaction({id:props.id, updatedData: updatedData}).unwrap();
          console.log(data);
          toast.success("Transaction Updated Successfully!", {
              position: "top-center",
            });
         
      } catch (error) {
          console.error('Failed to create transaction:', error);
          toast.error("Error! Please try again", {
              position: "top-center",
            });
      }
          
      }
     
      props.toggleModal();
  }

 

    return(
        <>
        <div className="modal-Container">
       <div className="title"><h1>Edit Expense form</h1></div> 
        <div className="closeBtn"> <button onClick={props.toggleModal}> x </button></div>
        
        <form className="edit-Expense-Form" onSubmit={handleSubmit(onSubmit)}>

            
            <input type="text"  {...register('name')} />
            <select  {...register('category')}>
                <option value="" disabled selected>Select an option</option>
                <option value= "1">Rent</option>
                <option value="2">Eating-out</option>
                <option value="3">Transport</option>
                <option value="4">Utilities</option>
                <option value="5">Mobile Phone</option>
                <option value="6">Groceries</option>
                <option value="7">Fitness</option>
                <option value="8">Shopping</option>
            </select>
            <input type="text"  {...register('amount')} />
            <input type="date"  {...register('date')}  />  
            <div className="saveChangesBtn"><button type="submit" > Save Changes </button></div>


        </form>
            
        </div>

        </>
    )
}