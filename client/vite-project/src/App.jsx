import DonutChart from "./components/DonutChart"
import Label from "./components/Label"
import CreateExpenseForm from "./components/CreateExpenseForm"
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  
  return (
    <>
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
      <button> Go to Transaction History Page</button>
    </div>
    </div>
    </div>

    

    

    <div className="label-container">
    <Label/>
    </div>

  
    </>
  )
}

export default App
