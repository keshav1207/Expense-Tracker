import { Doughnut } from 'react-chartjs-2';
import{Chart,ArcElement} from 'chart.js';
import getTotal from '../tools/getTotal';
import { useGetAllTransactionsQuery } from '../redux/api';

Chart.register(ArcElement);

  const config = {
    data: {
        datasets: [{
        data: [10, 10, 10, 10, 10, 10, 10, 10],
        backgroundColor: [
          'red',
          'blue',
          'yellow',
          'green',
          'orange',
          'purple',
          'indigo',
          'pink'

        ],
        hoverOffset: 3,
        spacing: 20
      }]},

      options: {
       cutout:200,
      
      }
    };


 
export default function DonutChart(){
  const{data,isLoading} = useGetAllTransactionsQuery();
    return(
        <>
        <Doughnut {...config}></Doughnut>
        <div className="total-container">
        <h3>Total</h3>
        <span>$ {!isLoading && getTotal(data)}</span>
        </div>
        
        </>
    )
}