import { newsCard } from "@lib/types/newsCard.types";

type cardProps = {
    news: newsCard,
}

const Card = (props: cardProps) => {

    const { news } = props;

    return (
        <div className="card w-96 bg-base-100 shadow-xl image-full">
            <figure><img src="https://placeimg.com/400/225/arch" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{news.title}</h2>
                <p>{`Autor: ${news.author}`}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Ir a la noticia</button>
                </div>
            </div>
        </div>
    );
};

export default Card;