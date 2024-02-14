import { Doughnut } from 'react-chartjs-2';
import{Chart,ArcElement} from 'chart.js';

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
    return(
        <>
        <Doughnut {...config}></Doughnut>
        <div className="total-container">
        <h3>Total</h3>
        <span>$0</span>
        </div>
        
        </>
    )
}