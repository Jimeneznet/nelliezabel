import { newsCard } from "lib/types/newsCard.types";

type newsCrudRowProps = {
    newsData: newsCard
}

const NewsCrudRow = (props: newsCrudRowProps) => {
    
    const { newsData } = props;

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