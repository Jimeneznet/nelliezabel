import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { editWord } from 'hooks/editWord';
import {doc,getDoc} from 'firebase/firestore';
import {db} from 'lib/config/firebase.config';
import { uploadVideo } from 'lib/config/firebase.config';
import { getWords } from 'hooks/getWords';


const Edit = ({ words, selectedWord, setWords, setIsEditing,setEdited }) => {
  const [isWaiting, setIsWaiting] = useState(false);
  const id = selectedWord.id;
  const [word, setWord] = useState(selectedWord.data().word);
  const [description, setDescription] = useState(selectedWord.data().description);
  const [category, setCategory] = useState(selectedWord.data().category);
  const [video, setVideo] = useState(selectedWord.data().video);
  const [newVideo, setNewVideo] = useState("");
  const [isChecked, setIsChecked] = useState(selectedWord.data().forAppMobile);

  function containsNumbers(x){
    return /\d/.test(x);
  }
  function containsSpecialChars(x){
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(x);
  }
  function hasOnlySpecialChars(x){
    const pattern = /^[^a-zA-Z0-9]+$/;
    return pattern.test(x);
  }

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const handleUpdate = async(e) => {
    e.preventDefault();
    setIsWaiting(true)
    if (!word || !description || !category) {
      setIsWaiting(false)
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Todos los campos son requeridos.',
        showConfirmButton: true,
      });
    }else{
      if (containsNumbers(word) || containsSpecialChars(word)){
        setIsWaiting(false)
        return Swal.fire({
          icon:'error',
          title:'Error!',
          text:'La palabra contiene números o caracteres especiales',
          showConfirmButton: true,
        });
      }
      if (!isNaN(description) || hasOnlySpecialChars(description)){
        setIsWaiting(false)
        return Swal.fire({
          icon:'error',
          title:'Error!',
          text:' La descripción contiene sólo números o sólo caracteres especiales',
          showConfirmButton: true,
        });
      }
    }
    let url = ""
    if(newVideo != "")
    {
      url = await uploadVideo(newVideo)
    }else{
      url = video
    }
    const WordAEditar = {
      id,
      word,
      description,
      category,
      url,
      isChecked,
    };
    try{
      editWord(WordAEditar)
      setIsEditing(false)
      Swal.fire({
        icon: 'success',
        title: 'Modificado!',
        text: `La palabra ${WordAEditar.word} ha sido editada con éxito`,
        showConfirmButton: false,
        timer: 1500,
      });
      setIsWaiting(false)
      setEdited(true)
    }
    catch(err){
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: `Ha habido un error durante la edición. Intente nuevamente.`,
            showConfirmButton: false,
            timer: 1500,
          });
        console.log(err)
        setIsWaiting(false)
    }

  };

  return (
    <div className="contain-table">
      
      <form className="w-5/6 m-8" onSubmit={handleUpdate}>
        <div className=''>
          <h1 className="bg-secondaryHeader  h-[4rem] shadow-2xl z-1  font-bold indent-12 text-white align-baseline text-center mt-3">Modificar palabra</h1>
        </div>
        
        <div className='flex items-baseline space-x-5 text-3xl' > 
          <label className="" htmlFor="word"style={{width:'20%'}}>Palabra</label>
          <input
            id="word"
            type="text"
            name="word"
            value={word}
            onChange={e => setWord(e.target.value)}
            placeholder="Escriba la palabra.."
          />
        </div>


        <div className='flex items-baseline space-x-5 text-3xl' > 
          <label className="" htmlFor="word" style={{width:'20%'}}>Descripción</label>
        <input
          className="bg-white"
          id="description"
          type="text"
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        </div>
        <div className='flex items-baseline space-x-5 text-3xl'>
        <label style={{width:'20%'}} htmlFor="category">Categoría</label>
        <input
          id="category"
          type="text"
          name="category"
          value={category}
          onChange={e => setCategory(e.target.value)}
          class="mr-3"
        />
        </div>
        <div className='flex items-baseline space-x-5 text-3xl'>
        <label htmlFor="isForMobile">Para App Mobile</label>
        <input
           type="checkbox"
           id="isForMobile"
           name="isForMobile"
           value=""
           checked={isChecked}
           onChange={handleOnChange}
         />
        </div>
        <div>
          <div className='grid grid-flow-col auto-cols-max gap-x-16'>        
            
            <div className='col-span-1'>

              <div className='grid grid-rows-4 grid-flow-col gap-5'>

                <div className=' mt-20'>
                  <label htmlFor="video" className='text-3xl'>Subir video </label>  
                </div>
                
                <div className=' mt-2' >
                  <input
                    id="video"
                    type="file"
                    name="video"
                    accept="video/mp4,video/x-m4v,video/*"
                    onChange={e => setVideo(e.target.files[0])}
                  />
                </div>

                <div className= ''>
                    {!isWaiting &&(
                      <button class="btn btn-success disabled:opacity-50">Editar</button>
                    )}
                  
                    {isWaiting &&(
                      <div className="flex items-center justify-center ">
                        <div className="w-16 h-16 border-b-2 border-purple-700 rounded-full animate-spin"></div>
                      </div>
                    )}
                    <button hidden={isWaiting == true ? true : false } class="btn btn-error" style={{ marginLeft: '12px'}} onClick={() => setIsEditing(false)}>Cancelar</button>
                </div>

              </div>
      
            </div>

            <div className='col-span-1'>
              <label className='text-3xl' >Video actual</label>
              <iframe width="560" height="315" src={video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>  

          </div>

        </div>
        
      </form>
    </div>
  );
};

export default Edit;
