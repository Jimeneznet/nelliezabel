import React from "react";



const Filter = (sentence : string) => {

    const search =sentence.split(" ").map((element: any) =>(element.replace(/[^a-zA-Z]/g, ''))).filter((item) => item !== '')
    return (search);
  
    
  };
  
  export default Filter;