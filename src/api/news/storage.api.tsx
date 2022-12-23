import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "lib/config/firebase.config"

export const uploadNewsFile = async (file: any, name: string, type: string) => {
    if(!file) return null
    const imgRef = ref(storage, `news/${name}/${name}${type}`)
    await uploadBytes(imgRef, file)
    const url = await getDownloadURL(imgRef)
    return url
}