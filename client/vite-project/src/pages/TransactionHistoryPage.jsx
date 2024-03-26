import { useGetAllTransactionsQuery } from "../redux/api"
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function TransactionHistoryPage(){
    const{data, isLoading} = useGetAllTransactionsQuery();


  if (isLoading) return <div>Loading...</div>

    console.log(data);

    return(
        <>

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

        { data ?(data.map((item, index) => (
        <tr key={index}>
            <td data-title = "Name">{item.name}</td>
          <td data-title = "Amount">${item.amount}</td>
          <td data-title = "Category">{item.Category_Name}</td>
          {/* Extra formatting for date received from sql  */}
          <td data-title = "Date">{new Date(item.date).toLocaleDateString()}</td>   
         <td data-title = "Delete-Icon"><MdDelete /></td> 
         <td data-title = "Edit-Icon"><FaEdit /></td>
        </tr>
        
        ))): null }

        </tbody>


        </table>

        </div>
        
        
        </>
    )
}