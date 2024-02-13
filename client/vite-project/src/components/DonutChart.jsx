import { Doughnut } from 'react-chartjs-2';
import{Chart,ArcElement} from 'chart.js';

Chart.register(ArcElement);



  const config = {
    data: {
        datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4,
        spacing: 5
      }]},

      options: {
       cutout:180,
      
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