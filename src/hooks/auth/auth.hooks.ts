import { auth } from "../../lib/config/firebase.config";
import { useUser } from "../../lib/context/user.context";
import { onAuthStateChanged } from "firebase/auth";
import { getUser } from "../useGetAuth";
import { useEffect } from "react";

export const useAuthStateChange = () => {
  const userContext = useUser();
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      const handleGetUser = async () => {
        const userDoc = await getUser(currentUser?.uid);
        if (!userDoc || userDoc === "error") return;
        try {
          const user = {
            nombre: userDoc.data().nombre,
            rut: userDoc.data().rut,
            id: userDoc.id,
            email: userDoc.data().email,
            rol: userDoc.data().rol,
            status: userDoc.data().status,
            uid: userDoc.data().uid,
          };
          userContext.dispatch({ type: "login", user: user });
        } catch (error) {
          console.error(error);
        }
      };
      handleGetUser();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
