import React from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Datalist from "../components/Datalist"

const Dictionary = () => {
  return (
    <div>
      <div className="">
        <Header>Centro de Administracion</Header>
        <Datalist></Datalist>
        <Layout>Diccionario</Layout>
      </div>
    </div>
  );
};

export default Dictionary;
