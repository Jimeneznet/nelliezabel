import React from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";

const CreateNews = () => {
  return (
    <div>
        <div className="">
            <Header>Centro de Administracion</Header>
            <Layout>
                <div className="flex flex-row justify-center">
                    <div className="card w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Agregar Noticia</h2>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Titulo</span>
                                </label> 
                                <textarea className="textarea textarea-bordered h-24" placeholder="Titulo"></textarea>
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Autor</span>
                                </label>
                                <input type="text" placeholder="Escriba aca" className="input input-bordered w-full max-w-xs" />
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Imagen</span>
                                </label>
                                <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Video</span>
                                </label>
                                <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text">Fecha de la Noticia</span>
                                </label>
                                <input type="date" placeholder="Escriba aca" className="input input-bordered w-full max-w-xs" />
                            </div>

                            <div className="card-actions justify-center mt-7">
                            <button className="btn btn-primary">agregar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    </div>
    );
};

export default CreateNews;