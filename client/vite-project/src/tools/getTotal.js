//Function to get total amount of all transactions


function getSum(total, transaction) {
    return total + parseFloat(transaction.amount);
  }


export default function getTotal(array){
    return array.reduce(getSum,0);
}



