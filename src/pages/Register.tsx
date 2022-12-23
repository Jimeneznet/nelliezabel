import { useEffect } from "react";
import RegisterView from "../components/admin/RegisterView";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  db,
  registerWithEmailAndPassword,
} from "../lib/config/firebase.config";

import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { collection, getDocs, query, where } from "firebase/firestore";

const Register = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  async function registrarUsuario(
    email: string,
    password: string,
    rol: string,
    rut: string,
    nombre: string,
    status: string
  ) {
    registerWithEmailAndPassword(rol, email, password, rut, nombre, status);
  }

  const submitHandler = async (e: any) => {
    e.preventDefault();

    const email = e.target.elements.email.value;
    const rol = e.target.elements.rol.value;
    const rut = e.target.elements.rut.value;
    const nombre = e.target.elements.name.value;
    const status = "1";
    const password = rut.slice(0, 6);

    if (!RegExp("^(\\d{1,3}(?:\\d{1,3}){2}[\\dk])$").test(rut)) {
      alert("El rut debe tener un formato válido, sin puntos ni guión");
      return;
    }

    if (
      !RegExp(
        "^[a-zA-ZÀ-ÿ\\u00f1\\u00d1]+(\\s*[a-zA-ZÀ-ÿ\\u00f1\\u00d1]*)*[a-zA-ZÀ-ÿ\\u00f1\\u00d1]+$"
      ).test(nombre)
    ) {
      alert("El nombre debe tener sólo letras");
      return;
    }

    if (!rol) {
      alert("Seleccione un rol");
      return;
    }

    const documento = collection(db, "usuarios");
    const esRut = query(documento, where("rut", "==", rut));
    const esEmail = query(documento, where("email", "==", email));

    const querySnapshotRut = await getDocs(esRut);
    const userByRutDoc = querySnapshotRut.docs.shift();

    if (userByRutDoc) {
      alert("El rut ingresado ya se encuentra en uso");
      return;
    }

    const querySnapshotEmail = await getDocs(esEmail);
    const userByEmailDoc = querySnapshotEmail.docs.shift();

    if (userByEmailDoc) {
      alert("El email ingresado ya se encuentra en uso");
      return;
    }

    console.log("submit", email, password, rol);

    registrarUsuario(email, password, rol, rut, nombre, status);

    navigate("/admin/users");
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  return (
    <div>
      <Header>Agregar Usuario</Header>
      <Layout>
        <RegisterView
          submitHandler={(e: any) => submitHandler(e)}
        ></RegisterView>
      </Layout>
    </div>
  );
};

export default Register;
