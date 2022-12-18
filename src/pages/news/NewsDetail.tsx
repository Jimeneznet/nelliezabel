import { useParams } from "react-router-dom";
import Footer from "components/Footer";
import { getNews } from "api/news/getNews.api";
import { useEffect, useState } from "react";
import Header from "components/Header";
import { newsCard } from "lib/types/newsCard.types";
import ReactPlayer from "react-player";

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
                <div className="bg-white h-full w-full pb-10">
                    <div className="bg-white h-full flex m-auto w-11/12 flex-col justify-center">
                        <ReactPlayer 
                        url="https://www.youtube.com/watch?v=MefbMlcGStY" 
                        controls 
                        className="m-auto mt-10"
                        width='70%'
                        />
                        <h2 className="text-black text-3xl mt-5">{data.title}</h2>
                        <h2 className="text-black text-1xl"> {data.author}</h2>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }

    if (noData) {
        return (
            <div>
                <Header>Portal de noticias</Header>
                <div className="bg-white h-full flex m-auto w-11/12 flex-col justify-center">

                <h2 className="text-black text-5xl my-3">La noticia que esta buscando no existe</h2>
                </div>
            </div>
        )
    }

    return (
        <div>
        <Header>Portal de noticias</Header>
        <div className="bg-white h-full w-full">
          <div className=" bg-white m-auto h-full flex flex-row justify-center w-11/12">
            <div className="radial-progress animate-spin text-primary mt-5"></div>
          </div>
        </div>
        <Footer/>
      </div>
    )
}

export default NewsDetail;