import { useGetAllTransactionsQuery } from "../redux/api"
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDeleteTransactionMutation } from "../redux/api";
import {  toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";


export default function TransactionHistoryPage(){
    const{data, isLoading} = useGetAllTransactionsQuery();
    const [DeleteTransaction] = useDeleteTransactionMutation();
    const [modal, showModal] = useState(false);


  if (isLoading) return <div>Loading...</div>

    console.log(data);


    async function  handleDelete(id){
    if(id){
      try {
          console.log(id);
          const data = await DeleteTransaction(id).unwrap();
          console.log(data);
          toast.success("Transaction Deleted Successfully!", {
              position: "top-center",
            });
         
      } catch (error) {
          console.error('Failed to Delete transaction:', error);
          toast.error("Error! Please try again", {
              position: "top-center",
            });
      }
          
      }
    
  }

    return(
        <>
        <ToastContainer/>
        {modal && <div className="overlay"></div> }
        <div className="home">
          <Link to={"/"}>< FaHome id="home-icon"/></Link>
        
        </div>

        <div className="table-container">

        <table>

        <caption> Transaction History</caption>


        {/* Add the headers */}

        <thead>
        <tr>
        <th>Name</th>
        <th>Amount</th>
        <th>Category</th>
        <th>Date</th>
        <th></th>
        <th></th>
        </tr>
        </thead>



        <tbody>

        {/* Add data in table from RTK query */}

        { data ?(data.map((item) => (
        <tr key={item.id}>
            <td data-title = "Name">{item.name}</td>
          <td data-title = "Amount">${item.amount}</td>
          <td data-title = "Category">{item.Category_Name}</td>
          {/* Extra formatting for date received from sql  */}
          <td data-title = "Date">{new Date(item.date).toLocaleDateString()}</td>   
         <td data-title = "Delete-Icon" onClick={()=> handleDelete(item.id)}><MdDelete /></td> 
         <td data-title = "Edit-Icon"><FaEdit /></td>
        </tr>
        
        ))): null }

        </tbody>


        </table>

        </div>
        
        
        </>
    )
}