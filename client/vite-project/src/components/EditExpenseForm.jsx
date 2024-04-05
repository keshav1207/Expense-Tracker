
export default function EditExpenseForm(props){
    
    return(
        <>
        <div className="modal-Container">
       <div className="title"><h1>Edit Expense form</h1></div> 
        <div className="closeBtn"> <button onClick={props.toggleModal}> x </button></div>
        
        <form className="edit-Expense-Form">

            
            <input type="text" placeholder="Rent, Gym membership, Presto top up"   />
            <select >
                <option value= "1">Rent</option>
                <option value="2">Eating-out</option>
                <option value="3">Transport</option>
                <option value="4">Utilities</option>
                <option value="5">Mobile Phone</option>
                <option value="6">Groceries</option>
                <option value="7">Fitness</option>
                <option value="8">Shopping</option>
            </select>
            <input type="text" placeholder="$200"  />
            <input type="date"  />
            <div className="saveChangesBtn"><button > Save Changes </button></div>


        </form>
            
        </div>

        </>
    )
}