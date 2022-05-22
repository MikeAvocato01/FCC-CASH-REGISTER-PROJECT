/*This function checks if the change due is equal to the total money in Cid argument*/
function changeEqualDrawer(a, b, cid) {
  
  let changeDue = b - a;
  
  let moneyInCid = 0; 
  for(let i of cid) {
    moneyInCid += i[1]; 
  }; 
  
  if (moneyInCid === changeDue) {
    let changeToReturn = []; 
    
    for(let item of cid) {
      if(item[1] > 0) {
        changeToReturn.unshift(item); 
      } else {
        changeToReturn.push(item); 
        
      }   
     
    };  
    return  { status: 'CLOSED', change: changeToReturn };  
  
  }
}; 


function checkCashRegister(price, cash, cid) {

  const closedReturning = changeEqualDrawer(price, cash, cid);
  
  if(closedReturning !== undefined) {
    return closedReturning; 
  };

  //Continue to this code if function above does not execute.
  //Work with units multiplied by 100.    
   const currencyUnits = [
      ['PENNY', 1],
      ['NICKEL', 5],
      ['DIME', 10],
      ['QUARTER', 25],
      ['ONE', 100],
      ['FIVE', 500],
      ['TEN', 1000],
      ['TWENTY', 2000],
      ['ONE HUNDRED', 10000]
   ];
   
   let changeToReturn = Math.round(cash * 100 - price * 100);

   let cashInCid = {};
   let cashToReturn = {};

   cid.forEach(item => {
      cashInCid[item[0]] = Math.round(item[1] * 100);
   });

   for (let i = currencyUnits.length - 1; i >= 0; i--) {
      let moneyName = currencyUnits[i][0];
      let moneyValue = currencyUnits[i][1];

      if (changeToReturn - moneyValue > 0) {
         cashToReturn[moneyName] = 0;

         while (cashInCid[moneyName] > 0 && changeToReturn - moneyValue >= 0) {
            cashToReturn[moneyName] += moneyValue;
            cashInCid[moneyName] -= moneyValue;
            changeToReturn -= moneyValue;
         };
      };
   }; //End of foor loop.   
   
  if(changeToReturn === 0) {
    let changeArr = []; 
    const mapCash = Object.keys(cashToReturn); 
    mapCash.map(type => {
      changeArr.push([type, cashToReturn[type] / 100]); 
    });
    return {status: "OPEN", change: changeArr}; 
  }; 
 

  return {status: "INSUFFICIENT_FUNDS", change: []}; 
   

}; 

const res = checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])

console.log(res);  