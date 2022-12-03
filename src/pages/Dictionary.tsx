import DictionaryList from "../components/dictionary/DictionaryList";
import { useWord } from "api/dictionary/dictionary.api";
import Header from "../components/Header";
import Datalist from "../components/Datalist"
import Layout from "@components/Layout";

const Dictionary = () => {
  const { words } = useWord();
  return (
    <div>
      <div className="">
        <Header>Diccionario</Header>
        <DictionaryList words={words} />
        {/* <Datalist></Datalist> */}
        {/* <Layout>Diccionario</Layout> */}
      </div>
    </div>
  );
};

export default Dictionary;
