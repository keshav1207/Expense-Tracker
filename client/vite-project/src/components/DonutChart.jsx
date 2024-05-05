import { Doughnut } from 'react-chartjs-2';
import{Chart,ArcElement} from 'chart.js';
import getTotal from '../tools/getTotal';
import { useGetAllTransactionsQuery } from '../redux/api';
import { useGetAllCategoriesQuery } from '../redux/api';
import getCategoryTotal from '../tools/getCategoryTotal';
import { useParams } from 'react-router-dom';

Chart.register(ArcElement);

export default function DonutChart(){
const { userId } = useParams();
const{data:transactions, isLoading} = useGetAllTransactionsQuery(userId);
const{data:categories} = useGetAllCategoriesQuery();
const categoryTotal = getCategoryTotal(transactions);
const total =  transactions? getTotal(transactions): 0;


    const CategoryData = {}

    //Adding category name and amount to data
    for(let key in categoryTotal){
      CategoryData[key] = {colour:'to be implemented',amount:categoryTotal[key], percentage:(categoryTotal[key]/total)*100};  
    }

    //Adding colour to data
    if(categories){

        for(let category of categories){
        if(CategoryData[category.name]){
          CategoryData[category.name].colour = category.colour;
        }
        }
    }

    console.log(CategoryData);


  const config = {
    data: {
        datasets: [{
        data: Object.values(CategoryData).map(data => data.amount),
        backgroundColor: Object.values(CategoryData).map(data => data.colour),
        hoverOffset: 3,
        spacing: 20
      }]},

      options: {
       cutout:200,
      
      }
    };
  
    return(
        <>
        <Doughnut {...config}></Doughnut>
        <div className="total-container">
        <h3>Total</h3>
        <span>$ {!isLoading && total}</span>
        </div>
        
        </>
    )
}