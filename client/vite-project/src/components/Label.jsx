
export default function Label(){
    const data = {
        Rent: {colour:'red', amount: 10} ,
        EatingOut:{colour:'blue', amount: 10} ,
        Transport: {colour:'yellow', amount: 10} ,
        Utilities: {colour:'green', amount: 10} ,
        Mobile: {colour:'orange', amount: 10} ,
        Groceries: {colour:'purple', amount: 10} ,
        Fitness: {colour:'indigo', amount: 10} ,
        Shopping: {colour:'pink', amount: 10} 
    }
    return(
        <>
           {renderLabel(data)}
        </>
    )
}


function renderLabel(data){
    if(data){
        // We use Object.keys to get an array of keys from the object so as 
        //to use the .map function which is used only on arrays
        const labels = Object.keys(data).map((expense, index) => {
            const{ colour, amount } = data[expense];

            return(  
            <div className="label" key={index}>
                <div className="label-colour" style={{ backgroundColor: colour }}></div>
                <div className="label-key" >{expense}</div>
                <div className="label-amount" >$ {amount}</div>
            </div>);
          
            
        });

        return labels;
    }  

}