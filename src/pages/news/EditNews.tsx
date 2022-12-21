import Layout from "../../components/Layout";
import Header from "../../components/Header";
import Footer from "components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNews } from "api/news/getNews.api";
import { editNews } from "api/news/firestore.api";
import { newsState } from "./CreateNews";

const EditNews = () => {

    const { newsId } = useParams();
    const navigate = useNavigate();

    const [news, setNews] = useState<newsState>({
        title: "",
        author: "",
        date: "",
    })
    const [img, setImg] = useState<File | null>(null)
    const [video, setVideo] = useState<File | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setNews(previous => {
            if (e.target !== null) {
                return { ...previous, [e.target.name]: e.target.value }
            }
            else {
                return { ...previous }
            }
        })
    }

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const setNewsData = async () => {
            if (newsId) {
                const newsData = await getNews(newsId);
                if (newsData) {
                    setNews(newsData)
                }
            }
        }

        setNewsData();

        return () => { }
    }, [newsId])

    if (loading) {
        return (
            <div>
                <Header>Editando noticia</Header>
                <Layout>
                    <div className="bg-white h-full w-full">
                        <div className=" bg-white m-auto h-full flex flex-row justify-center w-11/12">
                            <div className="radial-progress animate-spin text-primary my-10"></div>
                        </div>
                    </div>
                </Layout>
            </div>
        )
    }

    if (news.date && newsId) {
        return (
            <div>
                <Header>Editor de Noticias</Header>
                <Layout>
                    <div className="flex flex-row justify-center">
                        <div className="card w-96 bg-base-100 shadow-xl">
                            <div className="card-body">
                                <h2 className="card-title">Agregar Noticia</h2>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Titulo</span>
                                    </label>
                                    <input name="title" onChange={event => handleChange(event)} className="textarea textarea-bordered h-24" defaultValue={news.title}></input>
                                </div>

                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Autor</span>
                                    </label>
                                    <input name="author" onChange={event => handleChange(event)} type="text" defaultValue={news.author} className="input input-bordered w-full max-w-xs" />
                                </div>

                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Imagen</span>
                                    </label>
                                    <input onChange={e => setImg( e.target.files !== null ? e.target.files[0] : null )} type="file" accept="image/*" className="file-input file-input-bordered w-full max-w-xs" />
                                </div>

                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Video</span>
                                    </label>
                                    <input onChange={e => setVideo( e.target.files !== null ? e.target.files[0] : null )} type="file" accept="video/*" className="file-input file-input-bordered w-full max-w-xs" />
                                </div>

                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Fecha de la Noticia</span>
                                    </label>
                                    <input name="date" type="date" max={new Date().toISOString().split('T')[0]} onChange={event => handleChange(event)} defaultValue={new Date(news.date).toISOString().split('T')[0]} placeholder="Escriba aca" className="input input-bordered w-full max-w-xs" />
                                </div>

                                <div className="card-actions justify-center mt-7">
                                    <input onClick={(e) => editNews(e, newsId, news, img, video, setLoading).then((response) => { if (response) navigate("/admin/news") })} className="btn btn-primary" value={"editar"} />
                                    <input onClick={() => navigate("/admin/news")} className="btn btn-primary" value={"cancelar"} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Layout>
                <Footer></Footer>
            </div>
        );
    }

    return (
        <div>
            <Header>Editor de Noticias</Header>
            <Layout>
                <h2>Cargando....</h2>
            </Layout>
        </div>
    )
};

export default EditNews;