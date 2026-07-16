var createCounter = function(init) {  
   const origin = init ;
   let calls = {
    increment : function (){
        return ++init;
    },
    decrement : function (){
        return --init ;
    },
    reset : function (){
        init=origin;
        return init;
    }
   } 
   return calls ;
};
const counter = createCounter(5) 
  console.log("r1=",counter.increment());// 6
  console.log("r2=",counter.reset());// 5
  console.log("r3=",counter.decrement());// 4
