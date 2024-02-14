import DonutChart from "./components/DonutChart"
import Label from "./components/Label"
function App() {
  
  return (
    <>
    <div className="header-container">
    <div>Expense Tracker</div>
    </div>

    <div className="chart-container">
    <DonutChart/>
    </div>

    <div className="label-container">
    <Label/>
    </div>
    
   


  
    </>
  )
}

export default App
