import React, { useState } from "react";
import Layout from "../../components/Layout";
import Header from "../../components/Header";
import { uploadNews } from "api/news/firestore.api";
import { useNavigate } from "react-router-dom";

export type newsState = {
  title: string;
  author: string;
  date: string;
};

const CreateNews = () => {
  const uuid = crypto.randomUUID();

  const [news, setNews] = useState<newsState>({
    title: "",
    author: "",
    date: new Date().toDateString(),
  });
  const [img, setImg] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNews((previous) => {
      if (e.target !== null) {
        return { ...previous, [e.target.name]: e.target.value };
      } else {
        return { ...previous };
      }
    });
  };

  const navigate = useNavigate();

  if (loading) {
    return (
      <div>
        <Header>Agregando noticia</Header>
        <Layout>
          <div className="bg-white h-full w-full">
            <div className=" bg-white m-auto h-full flex flex-row justify-center w-11/12">
              <div className="radial-progress animate-spin text-primary my-10"></div>
            </div>
          </div>
        </Layout>
      </div>
    );
  }

  return (
    <div>
      <div className="">
        <Header>Agregar noticia</Header>
        <Layout>
          <div className="flex flex-row justify-center mt-5">
            <div className="card w-96 bg-base-100 shadow-xl">
              <form className="card-body">
                <h2 className="card-title">Agregar Noticia</h2>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Titulo</span>
                  </label>
                  <input
                    className="textarea textarea-bordered h-24"
                    onChange={(event) => handleChange(event)}
                    name="title"
                    placeholder="Titulo"
                  />
                </div>

                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Autor</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Escriba aca"
                    name="author"
                    onChange={(event) => handleChange(event)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>

                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Imagen</span>
                  </label>
                  <input
                    onChange={(e) =>
                      setImg(e.target.files !== null ? e.target.files[0] : null)
                    }
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full max-w-xs"
                  />
                </div>

                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Video</span>
                  </label>
                  <input
                    onChange={(e) =>
                      setVideo(
                        e.target.files !== null ? e.target.files[0] : null
                      )
                    }
                    type="file"
                    accept="video/*"
                    className="file-input file-input-bordered w-full max-w-xs"
                  />
                </div>

                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Fecha de la Noticia</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    max={new Date().toISOString().split("T")[0]}
                    defaultValue={new Date().toISOString().split("T")[0]}
                    onChange={(event) => handleChange(event)}
                    placeholder="Escriba aca"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>

                <div className="card-actions justify-center mt-7">
                  <input
                    onClick={(e) =>
                      uploadNews(e, uuid, news, img, video, setLoading).then(
                        (response) => {
                          if (response) navigate("/admin/news");
                        }
                      )
                    }
                    type="input"
                    name="agregar"
                    className="btn btn-primary"
                    value={"agregar"}
                  />
                  <input
                    onClick={(e) => navigate("/admin/news")}
                    type="input"
                    name="cancelar"
                    className="btn btn-primary"
                    value={"cancelar"}
                  />
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
