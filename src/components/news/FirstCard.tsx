import { newsCard } from "@lib/types/newsCard.types";
import { useNavigate } from "react-router-dom";

type firstCardProps = {
    news: newsCard,
}

const FirstCard = (props: firstCardProps) => {

    const { news } = props;
    const navigate = useNavigate();

    return (
        <div className="card w-96 bg-base-100 shadow-xl image-full">
            <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{news.title}</h2>
                <p>{`Autor: ${news.author}`}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => navigate(`/news/${news.id}`)} className="btn btn-primary">Ir a la noticia</button>
                </div>
            </div>
        </div>
    );
};

export default FirstCard;