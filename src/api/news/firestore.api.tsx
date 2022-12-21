import { db, storage } from "lib/config/firebase.config";
import { deleteDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { uploadNewsFile } from "./storage.api";
import Swal from "sweetalert2";
import { newsState } from "pages/news/CreateNews";
import { deleteObject, ref } from "firebase/storage";

const validateNewsData = (data: newsState, img: File | null, video: File | null) => {
    if (!data.title || !data.author || !data.date || !img || !video) {
        return false
    }
    return true
}

const validateFilesType = (img: File | null, video: File | null) => {
    if(!img?.name.match(/\.(jpf|jpeg|png|gif)$/) || !video?.name.match(/\.(mp4|mkv)$/)){
        return false
    }
    return true
}

const printError = (message: string) => {
    Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: `${message}`,
        showConfirmButton: false,
        timer: 1500,
    });
}

const printSucces = (message: string) => {
    Swal.fire({
        icon: 'success',
        title: 'Editado!',
        text: `${message}`,
        showConfirmButton: false,
        timer: 1500,
    });
}

export const editNews = async (e: React.MouseEvent<HTMLInputElement>, id: string, data: newsState, img: File | null, video: File | null, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        e.preventDefault()
        if (!validateNewsData(data, img, video)) {
            printError("Debe de llenar todos los campos")
            return false
        }
        else if(!validateFilesType(img, video)){
            printError("Verifique los tipos de archivos subidos")
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
            printSucces("Noticia editada correctamente")
            return true
        }
    } catch (error) {
        setLoading(false)
        printError("Ha ocurrido un error durante la transacción!")
    }
}

export const uploadNews = async (e: React.MouseEvent<HTMLInputElement>, id: string, data: newsState, img: File | null, video: File | null, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        e.preventDefault()
        if (!validateNewsData(data, img, video)) {
            printError("Debe de llenar todos los campos")
            return false
        }
        else if(!validateFilesType(img, video)){
            printError("Verifique los tipos de archivos subidos")
            return false
        }
        else {
            setLoading(true)
            const imgUrl = await uploadNewsFile(img, id, "img")
            const videoUrl = await uploadNewsFile(video, id, "mp4")
            const news = { ...data, uploadDate: new Date(), imgUrl: imgUrl, videoUrl: videoUrl }
            await setDoc(doc(db, 'news', id), news)
            setLoading(false)
            printSucces("Noticia añadida correctamente")
            return true
        }
    } catch (error) {
        setLoading(false)
        printError("Ha ocurrido un error durante la transacción!")
    }
}

export const deleteNews = async (id: string) => {
    const imgRef = ref(storage, `/news/${id}/${id}img`);
    const videoRef = ref(storage, `/news/${id}/${id}mp4`);
    deleteObject(imgRef).then( () => {
        deleteObject(videoRef).then(() => {
            deleteDoc(doc(db, "news", id))
            printSucces("Noticia eliminada correctamente")
        })
    }).catch(() => {
        printError("Ha ocurrido un error durante la transacción!")
    })
}