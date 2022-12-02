const outputBox = document.querySelector("#output-box")
const checkBtn = document.querySelector("#check-btn");
const inputDate = document.querySelector("#date-of-birth")

function reverseString(str){
   var listOfChars = str.split('');
   var reversedListOfChars = listOfChars.reverse();
   var reversedString = reversedListOfChars.join('');
   return reversedString;
}

function isPalindrome(str){
    var reversedString = reverseString(str);
    return str === reversedString;
}

function convertDateToString(date){
     var dateStr = { day:"",month:"",year:""};
     if(date.day<10){
        dateStr.day = "0"+date.day;
     }else dateStr.day = date.day.toString();
     if(date.month<10){
        dateStr.month = "0"+date.month;
     }else dateStr.month = date.month.toString();
     
     dateStr.year = date.year.toString();
     return dateStr;
}

function getAllDateFormats(date){
     var dateStr = convertDateToString(date);

     var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
     var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
     var yyyymmdd = dateStr.year + dateStr.month + dateStr.day ;
     var ddmmyy =   dateStr.day + dateStr.month + dateStr.year.slice(-2);
     var mmddyy =   dateStr.month + dateStr.day + dateStr.year.slice(-2);
     var yymmdd =   dateStr.year.slice(-2) + dateStr.month + dateStr.day;
     return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}

function checkPalindromeForAllDateFormats(date){
   var listOfPalindromes = getAllDateFormats(date);
   var flag = false;
    for(let index of listOfPalindromes.values()){
          if(isPalindrome(index)){
            flag = true;
            break;
          }
   }
   return flag;
}

function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}

function getNextDate(date){
   var day = date.day + 1;
   var month = date.month;
   var year = date.year;

   var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    
   if(month === 2){
      if(isLeapYear(year)){
          if(day>29){
            day = 1;
            month++;
          }
      }
      else {
        if(day>28){
            day = 1;
           month++;
        }
      }
   }else{
    if(day > daysInMonth[month-1]){
        day = 1;
        month++;
    }
   }
   if(month > 12){
    month = 1;
    year++;
   }
   return {day:day,month:month,year:year}
}

function getPreviousDate(date){
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;
 
    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    if(month === 1 && day < 1){ 
        month = 12;
        day = daysInMonth[month-1];
        year--;
    }
    else {
    if(month === 3){
       if(isLeapYear(year)){
           if(day<1){
             day = 29;
             month--;
           }
       }
       else {
         if(day<1){
             day = 28;
            month--;
         }
       }
    }
    else{
       if(day < 1){
         day = daysInMonth[month-2];
         month--;
       }
    }
}
    
    return {day:day,month:month,year:year}
}

function getNextPalindromeDate(date){
    var counter = 0;
    var nextDate = getNextDate(date);
    while(1){
        counter++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if(isPalindrome){
            break;
        }
        else nextDate = getNextDate(nextDate);
    }
    return [counter,nextDate]
}

function getPreviousPalindromeDate(date){
    var counter = 0;
    var previousDate = getPreviousDate(date);
    while(1){
        counter++;
        var isPalindrome = checkPalindromeForAllDateFormats(previousDate);
        if(isPalindrome){
            break;
        }
        else previousDate = getPreviousDate(previousDate);
    }
    return [counter,previousDate]
}

var date = {
    day:12,
    month:8,
    year:2020
};


checkBtn.addEventListener("click" , function(){
    if(inputDate.value !== ""){
        var dateStr = inputDate.value.split("-");
        var date = {
            day : Number(dateStr[2]),
            month : Number(dateStr[1]),
            year: Number(dateStr[0])
        };
        var isPalindrome = checkPalindromeForAllDateFormats(date);
        if(isPalindrome){
            outputBox.innerText= "YAY! your birthday is a palindrome🥳🥳";
        }
        else{
            var previousPalindrome = getPreviousPalindromeDate(date);
            var nextPalindrome = getNextPalindromeDate(date);
            outputBox.innerText= "OOPS! your birthday is not a palindrome😢 and the next palindrome date is "+nextPalindrome[1].day+"-"+nextPalindrome[1].month+"-"+nextPalindrome[1].year+" and you missed it by "+nextPalindrome[0]+" days. The previous palindrome date is "+previousPalindrome[1].day+"-"+previousPalindrome[1].month+"-"+previousPalindrome[1].year+" and you missed it by "+previousPalindrome[0]+" days.";
        }
    }
})

