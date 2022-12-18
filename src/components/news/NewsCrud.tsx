import { newsCard } from "lib/types/newsCard.types";
import { useEffect, useState } from "react"
import { db } from "lib/config/firebase.config";
import { useNavigate } from "react-router-dom";
import { collection, query, getDocs } from "firebase/firestore";

const NewsCrud = () => {

    const [news, setNews] = useState<newsCard[]>([]);
    const [noData, setNoData] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchNews = async () => {
            const newsQuery = query(collection(db, "news"));
            const querySnapshot = await getDocs(newsQuery);
            const newsArray = querySnapshot.docs.map(news => { return { id: news.id, ...news.data() } as newsCard });
            newsArray.length !== 0 ? setNews(newsArray) : setNoData(true);
            setLoading(false);
        }
    
        fetchNews();
    
        return () => { }
        }, [])
    return (
        <div className="overflow-x-auto mt-10">
            <div className="flex flex-row justify-end">
                <button onClick={() => navigate(`/admin/news/create`)} className="btn mb-10 bg-primaryHeader text-white">Agregar Noticia</button>
            </div>
            <table className="table table-compact w-full rounded-t-lg">
                <thead className="bg-primaryHeader rounded-t-lg">
                    <tr className="bg-primaryHeader rounded-t-lg" >
                        <th className="text-white bg-primaryHeader">ID</th>
                        <th className="text-white bg-primaryHeader">Titulo</th>
                        <th className="text-white bg-primaryHeader">Autor</th>
                        <th className="text-white bg-primaryHeader">Fecha</th>
                        <th className="text-white bg-primaryHeader">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {news.map((news, index)=>
                    <tr className="hover">
                        <th className="bg-white p-0 m-auto">{index+1}</th>
                        <th className="bg-white">{news.title}</th>
                        <th className="bg-white">{news.author}</th>
                        <th className="bg-white">{news.date}</th>
                        <th className="bg-white m-auto">
                        <button className="m-auto btn bg-primaryHeader text-white">Editar</button>
                        <button className="m-auto btn bg-secondaryHeader text-white mx-5">Eliminar</button>
                        
                        </th>     
                    </tr>
                    )}
                </tbody>
            </table>
        </div>

    )
}

export default NewsCrud;
