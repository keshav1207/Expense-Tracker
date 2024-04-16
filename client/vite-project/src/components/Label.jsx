import { useGetAllTransactionsQuery } from "../redux/api";
import { useGetAllCategoriesQuery } from "../redux/api";
import getCategoryTotal from "../tools/getCategoryTotal";


export default function Label(){

const{data:transactions} = useGetAllTransactionsQuery();
const{data:categories} = useGetAllCategoriesQuery();

const categoryTotal = getCategoryTotal(transactions);


    const data = {}

    //Adding category name and amount to data
    for(let key in categoryTotal){
        data[key] = {colour:'to be implemented',amount:categoryTotal[key] };  
    }

    //Adding colour to data
    if(categories){

        for(let category of categories){
        if(data[category.name]){
          data[category.name].colour = category.colour;
        }
        }
    }
    

    console.log(data);

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