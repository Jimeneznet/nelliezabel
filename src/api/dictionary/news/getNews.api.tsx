import { db } from "lib/config/firebase.config"
import { doc, getDoc } from "firebase/firestore"
import { newsCard } from "lib/types/newsCard.types";

// Get one news filtred by the Document ID
export const getNews = async (id: string) => {
    const docRef = doc(db, "news", id);
    const newsSnapshot = await getDoc(docRef);

    if (newsSnapshot.exists()) {
        return { id: newsSnapshot.id, ...newsSnapshot.data() } as newsCard
    }

    return false
}