import React from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Dashboard  from "../../components/Dashboard/index";


const Word = () => {
  return (
    <div>
      <div className="">      

        <Header>Administración del Diccionario de señas</Header>
        <Layout>

       
          <Dashboard/>
          
                    
        </Layout>

      </div>
    </div>
  );
};

export default Word;
