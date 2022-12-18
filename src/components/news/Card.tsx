import { newsCard } from "@lib/types/newsCard.types";
import { useNavigate } from "react-router-dom";

type cardProps = {
    news: newsCard,
}

const Card = (props: cardProps) => {

    const { news } = props;
    const navigate = useNavigate();

    return (
        <div>
            <div onClick={() => navigate(`/news/${news.id}`)} className="hover:cursor-pointer hover:transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl card w-96 bg-base-100 shadow-xl sm:w-full">
                <figure className="bg-secondaryHeader"><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
                <div className="card-body bg-white m-0 p-0 rounded-b-lg">
                    <h2 className="card-title m-0 p-1 text-black">
                        {news.title} asd asdhkjas lorem asddhasask  askdkhas askjsdh h
                    </h2>
                    <div className="card-actions justify-end">
                    <p className="text-black p-1">{news.author}</p>
                        <div className="badge bg-white text-black p-2 m-2">{news.date}</div> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;