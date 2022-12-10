import React from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import NewsCrud from "components/news/NewsCrud";

const users = () => {
  return (
    <div>
      <div className="">
        <Header>Centro de Administracion</Header>
        <Layout>
          Noticias
          <NewsCrud></NewsCrud>
        </Layout>
      </div>
    </div>
  );
};

export default users;
