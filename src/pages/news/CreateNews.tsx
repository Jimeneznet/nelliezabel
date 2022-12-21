import React, { useState } from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import { uploadNews } from "api/news/firestore.api";
import { useNavigate } from "react-router-dom";

export type newsState = {
    title: string,
    author: string,
    date: string,
}

const CreateNews = () => {

    const uuid = crypto.randomUUID()

    const [news, setNews] = useState<newsState>({
        title: "",
        author: "",
        date: new Date().toDateString(),
    })
    const [img, setImg] = useState<unknown>(null)
    const [video, videoImg] = useState<unknown>(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setNews( previous => {
            if(e.target !== null){ 
                return {...previous, [e.target.name]: e.target.value}
            }
            else{
                return {...previous}
            }
        })
    }
    
    const navigate = useNavigate()

    if(loading){
        return(
            <div>
                <Header></Header>
                <Layout>
                    <h2>Subiendo noticias....</h2>
                </Layout>
            </div>
        )
    }

    return (
        <div>
            <div className="">
                <Header>Centro de Administracion</Header>
                <Layout>
                    <div className="flex flex-row justify-center">
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <form className="card-body">
                                <h2 className="card-title">Agregar Noticia</h2>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Titulo</span>
                                    </label>
                                    <input className="textarea textarea-bordered h-24" onChange={event => handleChange(event)} name="title" placeholder="Titulo" />
                                </div>

                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Autor</span>
                                    </label>
                                    <input type="text" placeholder="Escriba aca" name="author" onChange={event => handleChange(event)} className="input input-bordered w-full max-w-xs" />
                                </div>

                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Imagen</span>
                                    </label>
                                    <input type="file" onChange={ e => setImg(e.target.files !== null ? e.target.files[0] : null)} className="file-input file-input-bordered w-full max-w-xs" />
                                </div>

                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Video</span>
                                    </label>
                                    <input type="file" onChange={ e => videoImg(e.target.files !== null ? e.target.files[0] : null)} className="file-input file-input-bordered w-full max-w-xs" />
                                </div>

                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Fecha de la Noticia</span>
                                    </label>
                                    <input type="date" name="date" defaultValue={new Date().toISOString().split('T')[0]} onChange={event => handleChange(event)} placeholder="Escriba aca" className="input input-bordered w-full max-w-xs" />
                                </div>

                                <div className="card-actions justify-center mt-7">
                                    <input onClick={ (e) => uploadNews(e, uuid, news, img, video, setLoading).then( (response) => {if(response)navigate("/admin/news")})} type="input" name="agregar" className="btn btn-primary" value={"agregar"}/>
                                    <input onClick={ (e) => navigate("/admin/news")} type="input" name="cancelar" className="btn btn-primary" value={"cancelar"}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </Layout>
            </div>
        </div>
    );
};

export default CreateNews;