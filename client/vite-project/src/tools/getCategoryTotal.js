//Function to get the total per each category of transactions

export default function getCategoryTotal(transactions){
    let categoryTotal = {};
  

     for(var i in transactions){
            const categoryName = transactions[i].Category_Name;
            const amount = parseFloat(transactions[i].amount);

            
            if (categoryTotal[categoryName]) {
                categoryTotal[categoryName] += amount;
            } else {
                categoryTotal[categoryName] = amount;
            }
        

     }


    return categoryTotal;

}