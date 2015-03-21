$(document).ready(function(){
      // more complex jRating call
      $(".basic").jRating({
         // smallStarsPath : 'img/starwhite.png',
         // type : 'small',
         step:true,
         length : 5, // nb of stars
         rateMax : 5,
         decimalLength:1,
         sendRequest : false,
         showRateInfo:false,
         canRateAgain : true,
         nbRates : 3,
         onSuccess : function(){
           alert('Success : your rate has been saved :)');
         }
        //  ,
        //  onClick : function(element,rate) {
        //  alert(rate);
        // }
       });
});
