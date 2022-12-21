import { newsCard } from "@lib/types/newsCard.types";
import { useNavigate } from "react-router-dom";

type firstCardProps = {
    news: newsCard,
}

const FirstCard = (props: firstCardProps) => {

    const { news } = props;
    const navigate = useNavigate();

    return (

        <div onClick={() => navigate(`/news/${news.id}`)} className="hover:cursor-pointer hover:transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl rounded-md shadow-md">
            <div className="hero min-h-screen flex flex-col-reverse rounded-md" style={{ backgroundImage: `url(${news.imgUrl})` }}>
                <div className="hero-overlay h-1/3 flex flex-col-reverse text-neutral-content  bg-opacity-80 py-5 rounded-md">
                    <div className="pl-2">{news.author}</div>
                    <div className="pl-2 text-3xl">{news.title}</div>
                </div>
            </div>
        </div>
        
    );
};

export default FirstCard;