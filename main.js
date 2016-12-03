function checkCashRegister(price, cash, cid) {
  
  var rest = cash - price;
  
  var name = [];
  var raspolozivo = [];
  
  //Get the money and names of the money and push it to the arrays
  for(var x = cid.length-1; x>=0; x--){
    raspolozivo.push(cid[x][1]);
    name.push(cid[x][0]);
  }
  
   //Return the string "Closed" if cash-in-drawer is equal to the change due
  for(var f = 0; f<raspolozivo.length; f++){
    if(rest == raspolozivo[f]){
      return "Closed";
    }
  }
  
  //Djeljivo array
  var djeljivo = [100, 20, 10, 5, 1, 0.25, 0.10, 0.05, 0.01];
  
  //Separate the rest
  var money = [];
  var moneyName = [],
      nameArr = [];
  
  for(var i = 0; i<djeljivo.length; i++){
    
     while( rest !== 0 && rest>=djeljivo[i] && raspolozivo[i]!==0){

           if(moneyName.indexOf(name[i]) === -1){
             moneyName.push(name[i]);        
           }
           money.push(djeljivo[i]);
           rest-=djeljivo[i];
                   if(rest<0.01 && rest > 0){
                    rest = 0.01;
                    }
           raspolozivo[i]-=djeljivo[i];
      
     }
  }
  
  
  //Make arrays from moneyName
  for(var j = 0; j<moneyName.length; j++){
    nameArr.push([moneyName[j]]);
  }
  
  //Sum all same elements in money Array and push it to the nameArr;
  var prev; 
  var reducedMoney = money.reduce(function(money, value){
      if(prev!==value){
        money.push(prev = value);
      } else {
        money[money.length-1]+=value;
      }
    
    return money;
  },[]);

  
  for(var z = 0; z<nameArr.length; z++){
    nameArr[z].push(reducedMoney[z]);
  }
  
  //Sum all money to see is it less or bigger that rest
  var togetherMoney = money.reduce(function(a,b){
    return a + b;
  });
  
 
  //Return the string "Insufficient Funds" if cash-in-drawer is less than the change due. 
  if(rest>togetherMoney){
    return "Insufficient Funds";
  } 
  //Otherwise, return change in coin and bills, sorted in highest to lowest order.
  else  {
    return nameArr;
  }  
  
 //P.S. there is a problem with the "PENNY", sometimes it doesn't return 0.01 but 0.009999999999564
  
}


checkCashRegister(19.50, 20.00, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);




