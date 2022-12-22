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
          <div className="p-4 text-5xl text-black">
            Noticias
            <NewsCrud />
          </div>
        </Layout>
      </div>
    </div>
  );
};

export default users;
