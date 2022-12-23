import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { db } from "lib/config/firebase.config";
import { newsCard } from "lib/types/newsCard.types";
import Card from "components/news/Card";
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import FirstCard from "components/news/FirstCard";

const Home = () => {

  const [news, setNews] = useState<newsCard[]>([]);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const newsQuery = query(collection(db, "news"), orderBy("uploadDate", "desc"), limit(13));
      const querySnapshot = await getDocs(newsQuery);
      const newsArray = querySnapshot.docs.map(news => { return {id: news.id, ...news.data() } as newsCard });
      newsArray.length !== 0 ? setNews(newsArray) : setNoData(true);
      setLoading(false);
    }

    fetchNews();

    return () => { }
  }, [])

  if (loading) {
    return (
      <div>
        <Header>Portal de noticias</Header>
        <div className="bg-white h-full w-full">
          <div className=" bg-white m-auto h-full flex flex-row justify-center w-11/12">
            <div className="radial-progress animate-spin text-primary my-10"></div>
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
        {`No hay noticias disponibles :(`}
      </div>
    )
  }


  if (news.length === 1) {
    return (
      <div>
        <Header>Portal de noticias</Header>
        <div className=" bg-white h-screen flex flex-col justify-start">
          <h2>Noticias</h2>
          <FirstCard news={news[0]} />
        </div>  
      </div>
    )
  } else {
    return (
      <div>
        <Header>Portal de noticias</Header>
        <div className="bg-white h-full w-full pb-10">
          <div className="bg-white h-full flex m-auto w-11/12 flex-col justify-center">
            <h2 className="text-black text-5xl my-3">Ultima noticia</h2>
            <FirstCard news={news[0]}></FirstCard>
            <h2 className="text-black text-5xl my-3">Noticias</h2>
            <div className="m-auto grid  gap-10 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-1 md:grid-cols-2">
              {news.map((news, index) => index !== 0 ? <Card key={news.id} news={news}></Card> : null)}
            </div>
            </div>
          </div>
          <Footer/>
        </div>

    )
  }
};

export default Home;
