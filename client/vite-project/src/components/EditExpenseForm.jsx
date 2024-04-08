import { useEffect, useState } from "react";
import { useGetTransactionQuery } from "../redux/api";
export default function EditExpenseForm(props){

    const[productInfo, setProductInfo] = useState(null);
     const{data} = useGetTransactionQuery(props.id);
    
     useEffect(() => {
    // Update productInfo only when data is available
    if (data) {
      setProductInfo(data[0]);
      
    }
  }, [data]); 

  
    
     console.log(productInfo);

 

    return(
        <>
        <div className="modal-Container">
       <div className="title"><h1>Edit Expense form</h1></div> 
        <div className="closeBtn"> <button onClick={props.toggleModal}> x </button></div>
        
        <form className="edit-Expense-Form">

            
            <input type="text" value={productInfo?(`${productInfo.name.toUpperCase()}`):("Rent, Gym membership, Presto top up")}  />
            <select >
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
            <input type="text" value= {productInfo?(`$ ${productInfo.amount}`):("")}  />
            <input type="date" value= {productInfo?(`${ new Date(productInfo.date).toISOString().split('T')[0]}`):("")}  />  
            <div className="saveChangesBtn"><button > Save Changes </button></div>


        </form>
            
        </div>

        </>
    )
}