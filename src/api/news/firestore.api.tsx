import { db, storage } from "lib/config/firebase.config";
import { deleteDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { uploadNewsFile } from "./storage.api";
import Swal from "sweetalert2";
import { newsState } from "pages/news/CreateNews";
import { deleteObject, ref } from "firebase/storage";

export const editNews = async (e: React.MouseEvent<HTMLInputElement>, id: string, data: newsState, img: unknown, video: unknown, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        e.preventDefault()
        if (!data.title || !data.author || !data.date || !img || !video) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `Debe de rellenar todos los datos`,
                showConfirmButton: false,
                timer: 1500,
            });
            return false
        }
        else {
            setLoading(true)
            const imgUrl = await uploadNewsFile(img, id, "img")
            const videoUrl = await uploadNewsFile(video, id, "mp4")
            const news = { ...data, imgUrl: imgUrl, videoUrl: videoUrl }
            const newsRef = doc(db, "news", id)
            await updateDoc(newsRef, news)
            setLoading(false)
            Swal.fire({
                icon: 'success',
                title: 'Editado!',
                text: `Noticia editada correctamente`,
                showConfirmButton: false,
                timer: 1500,
            });
            return true
        }
    } catch (error) {
        setLoading(false)
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: `Ha ocurrido un error durante la transacción!`,
            showConfirmButton: false,
            timer: 1500,
        });
    }
}

export const uploadNews = async (e: React.MouseEvent<HTMLInputElement>, id: string, data: newsState, img: unknown, video: unknown, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        e.preventDefault()
        if (!data.title || !data.author || !data.date || !img || !video) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: `Debe de rellenar todos los datos`,
                showConfirmButton: false,
                timer: 1500,
            });
            return false
        }
        else {
            setLoading(true)
            const imgUrl = await uploadNewsFile(img, id, "img")
            const videoUrl = await uploadNewsFile(video, id, "mp4")
            const news = { ...data, imgUrl: imgUrl, videoUrl: videoUrl }
            await setDoc(doc(db, 'news', id), news)
            setLoading(false)
            Swal.fire({
                icon: 'success',
                title: 'Agregada!',
                text: `Noticia añadida correctamente`,
                showConfirmButton: false,
                timer: 1500,
            });
            return true
        }
    } catch (error) {
        setLoading(false)
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: `Ha ocurrido un error durante la transacción!`,
            showConfirmButton: false,
            timer: 1500,
        });
    }
}

export const deleteNews = async (id: string) => {
    const imgRef = ref(storage, `/news/${id}/${id}img`);
    const videoRef = ref(storage, `/news/${id}/${id}mp4`);
    deleteObject(imgRef).then( () => {
        deleteObject(videoRef).then(() => {
            deleteDoc(doc(db, "news", id))
            Swal.fire({
                icon: 'success',
                title: 'Eliminada',
                text: `Noticia eliminada correctamente`,
                showConfirmButton: false,
                timer: 1500,
            });
        })
    }).catch(() => {
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: `Ha ocurrido un error durante la transacción!`,
            showConfirmButton: false,
            timer: 1500,
        });
    })
}