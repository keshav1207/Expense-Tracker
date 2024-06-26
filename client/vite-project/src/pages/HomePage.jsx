import DonutChart from "../components/DonutChart"
import Label from "../components/Label"
import CreateExpenseForm from "../components/CreateExpenseForm"
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

export default function HomePage() {
  const { userId } = useParams();
  
  return (
    <>
    <div className="container">

    <ToastContainer/>
    <div className="header-container">
    <div>Expense Tracker</div>
    </div>

    <div className="upper-body">


    <div className="chart-container">

    <DonutChart/>
    </div>


    <div className="form-container">
      <CreateExpenseForm/>
      <div className="history-btn">
      <Link to={`/history/${userId}`}><button> Transaction History Page</button></Link>
    </div>
    </div>

   
    </div>

    

    <div className="label-container">
    <Label/>
    </div>

  


    </div>

    
    
    </>
  )
}

