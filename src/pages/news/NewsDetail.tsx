import { useParams } from "react-router-dom";
import { getNews } from "api/news/getNews.api";
import { useEffect, useState } from "react";
import Header from "components/Header";
import { newsCard } from "lib/types/newsCard.types";

const NewsDetail = () => {

    const [data, setData] = useState<newsCard>();
    const [noData, setNoData] = useState(false);

    const { newsId } = useParams();

    useEffect(() => {
        const setNewsData = async () => {
            if (newsId) {
                const newsData = await getNews(newsId);
                if (!newsData) {
                    setNoData(true)
                } else setData(newsData)
            }
        }

        setNewsData();

        return () => { }
    }, [newsId])

    if (data && !noData) {
        return (
            <div>
                <Header>Portal de noticias</Header>
                <div>
                    {data.title}
                    {data.author}
                </div>
            </div>
        )
    }

    if (noData) {
        return (
            <div>
                <Header>Portal de noticias</Header>
                <h2>La noticia que esta buscando no existe</h2>
            </div>
        )
    }

    return (
        <div>
            <Header>Portal de noticias</Header>
            <h2>Buscando noticia....</h2>
        </div>
    )
}

export default NewsDetail;