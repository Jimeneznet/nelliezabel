import React from 'react'
import { Word} from "../../lib/types/word.types";

const WordDetail = ({ word }: { word: Word }) => {
  return (
    <div>
        <input type="checkbox" id="word-detail" className="modal-toggle" />
        <div className="modal">
            <div className="modal-box">
                <h3 className="text-3x1 font-bold"> Palabra: {word.word}</h3>
                <p className="py-4">Categoría: {word.category}</p>
                <p className="py-4">Descripción: {word.description}</p>
                <p className="py-4">Vídeo: {word.video}</p>
            </div>
        </div>
    </div>
  )
}

export default WordDetail