import Header from "../components/Header";
import { useEffect, useState } from "react";
import { db } from "lib/config/firebase.config";
import { newsCard } from "lib/types/newsCard.types";
import Card from "components/news/Card";
import { collection, query, getDocs } from "firebase/firestore";
import FirstCard from "components/news/FirstCard";

const Home = () => {

  const [news, setNews] = useState<newsCard[]>([]);
  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      const newsQuery = query(collection(db, "news"));
      const querySnapshot = await getDocs(newsQuery);
      const newsArray = querySnapshot.docs.map(news => news.data() as newsCard);
      setLoading(false);
      newsArray.length !== 0 ? setNews(newsArray) : setNoData(true);
    }

    fetchNews();

    return () => { }
  }, [])

  if (loading) {
    return (
      <div>
        <Header>Portal de noticias</Header>
        <h2>
          Loading....
        </h2>
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
        <FirstCard news={news[0]} />
      </div>
    )
  } else {
    return (
      <div>
        <Header>Portal de noticias</Header>
        <FirstCard news={news[0]}></FirstCard>
        {news.splice(0, 1).map(news => <Card news={news}></Card>)}
      </div>
    )
  }
};

export default Home;