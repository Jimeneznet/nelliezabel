import { newsCard } from "lib/types/newsCard.types";
import { useEffect, useState } from "react";
import { db } from "lib/config/firebase.config";
import { useNavigate } from "react-router-dom";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { deleteNews } from "api/news/firestore.api";

export const formatDate = (date: string) => {
  const aux = new Date(new Date(date).toUTCString());
  return `${aux.getUTCDate()}/${aux.getUTCMonth() + 1}/${aux.getUTCFullYear()}`;
};

const NewsCrud = () => {
  const [news, setNews] = useState<newsCard[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "news"), orderBy("uploadDate", "asc"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      const newsArray = querySnapshot.docs.map((news) => {
        return { id: news.id, ...news.data() } as newsCard;
      });
      newsArray.length !== 0 ? setNews(newsArray) : setNews([]);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <div className="overflow-x-auto mt-10">
      <div className="flex flex-row justify-end">
        <button
          onClick={() => navigate(`/admin/news/create`)}
          className="btn mb-10 bg-primaryHeader text-white"
        >
          Agregar Noticia
        </button>
      </div>
      <table className="table table-compact w-full rounded-t-lg">
        <thead className="bg-primaryHeader rounded-t-lg">
          <tr className="bg-primaryHeader rounded-t-lg">
            <th className="text-white bg-primaryHeader">ID</th>
            <th className="text-white bg-primaryHeader">Título</th>
            <th className="text-white bg-primaryHeader">Autor</th>
            <th className="text-white bg-primaryHeader">Fecha</th>
            <th className="text-white bg-primaryHeader">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {news.map((news, index) => (
            <tr key={news.id} className="hover">
              <th className="bg-white p-0 m-auto">{index + 1}</th>
              <th className="bg-white">{news.title}</th>
              <th className="bg-white">{news.author}</th>
              <th className="bg-white">{formatDate(news.date)}</th>
              <th className="bg-white m-auto">
                <button
                  onClick={() => navigate(`/admin/news/edit/${news.id}`)}
                  className="m-auto btn bg-primaryHeader text-white"
                >
                  Editar
                </button>
                <button
                  onClick={() => deleteNews(news.id)}
                  className="m-auto btn bg-secondaryHeader text-white mx-5"
                >
                  Eliminar
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewsCrud;
