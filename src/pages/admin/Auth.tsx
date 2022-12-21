import { User } from "../../lib/types/user.types";
import { useUser } from "../../lib/context/user.context";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import LoadingBar from "../../components/LoadingBar";
import AuthHome from "../../components/AuthHome";

const Auth = () => {
  const userData = useUser().user as User;
  return (
    <>
      <Header>Panel de Administración</Header>
      <Layout>
        {Object.keys(userData).length === 0 ? <LoadingBar /> : (
          <AuthHome userData={userData} />
        )}
      </Layout>
    </>
  );
};

export default Auth;
