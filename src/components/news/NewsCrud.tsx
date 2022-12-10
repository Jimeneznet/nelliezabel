import { newsCard } from "lib/types/newsCard.types";
import { useEffect, useState } from "react"

const NewsCrud = () => {

    const [newsList, setNewsList] = useState<newsCard[]>([]);

    useEffect(() => {
        //TODO, FETCH NEWS !!!PASAR METODO QUE SE ENCUENTRA EN EL USEEFFECT DEL HOME A LA CARPETA API
        return () => { }
    }, [])


    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Autor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* HACER UN MAP DE NEWSLIST DEVOLVIENDO EL COMPONENTE NEWSCRUDROW */}
                    <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Blue</td>
                    </tr>
                    <tr>
                        <th>2</th>
                        <td>Hart Hagerty</td>
                        <td>Desktop Support Technician</td>
                        <td>Purple</td>
                    </tr>
                    <tr>
                        <th>3</th>
                        <td>Brice Swyre</td>
                        <td>Tax Accountant</td>
                        <td>Red</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default NewsCrud;
