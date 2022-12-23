import { newsCard } from "lib/types/newsCard.types";
import { deleteNews } from "api/news/firestore.api";
import { useNavigate } from "react-router-dom";

type newsCrudRowProps = {
    newsData: newsCard
}

const NewsCrudRow = (props: newsCrudRowProps) => {
    
    const { newsData } = props;
    const navigate = useNavigate()

    return (
        <tr>
            <th>{newsData.id}</th>
            <td>{newsData.title}</td>
            <td>{newsData.author}</td>
            <td>
                <button>editar</button>
                <button>eliminar</button>
            </td>
        </tr>
    )
}

export default NewsCrudRow;