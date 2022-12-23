import React, { useState,useEffect } from 'react';
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

  useEffect(() => {
    categorySelected();
  }, []);


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
  function categorySelected(){
    const comboBox = document.getElementById("category");
    if (selectedWord.data().category == "Educación"){
      comboBox.options[0].selected = true; 
    }
    if(selectedWord.data().category == "Psicología"){
      comboBox.options[1].selected = true; 
    }
    if(selectedWord.data().category == "Jurídico"){
      comboBox.options[2].selected = true; 
    }

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
      if (containsNumbers(word) || containsSpecialChars(word) || hasOnlySpecialChars(word)){
        setIsWaiting(false)
        return Swal.fire({
          icon:'error',
          title:'Error!',
          text:'La palabra contiene números o caracteres especiales.',
          showConfirmButton: true,
        });
      }
      if (!isNaN(description) || hasOnlySpecialChars(description)){
        setIsWaiting(false)
        return Swal.fire({
          icon:'error',
          title:'Error!',
          text:' La descripción contiene sólo números o sólo caracteres especiales.',
          showConfirmButton: true,
        });
      }
    }
    let url = ""
    if(newVideo != "")
    {
      if (newVideo.type!="video/mp4" && newVideo.type!="video/x-m4v" && newVideo.type!="video/*"){
        setIsWaiting(false)
        return Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Solo se aceptan formatos de video en mp4.',
          showConfirmButton: true,
        });
      }
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
        text: `La palabra ${WordAEditar.word} ha sido editada con éxito.`,
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
    <div className="overflow-x-auto mx-14">
      
      <form className="w-5/6 m-8" onSubmit={handleUpdate}>
        <div className=''>
          <h1 className="bg-secondaryHeader rounded-lg h-[3rem] font-bold text-3xl indent-12 text-white align-baseline text-center mt-3">Modificar palabra</h1>
        </div>
        
        <div className='flex items-baseline space-x-5 text-3xl mt-4' > 
          <label className="" htmlFor="word"style={{width:'20%'}}>Palabra</label>
          <input
            id="word"
            type="text"
            name="word"
            value={word}
            onChange={e => setWord(e.target.value)}
            placeholder="Escriba la palabra.."
            className='input w-full mb-4'
          />
        </div>


        <div className='flex items-baseline space-x-5 text-3xl' > 
          <label className="" htmlFor="word" style={{width:'20%'}}>Descripción</label>
        <input
          className="input w-full mb-4"
          id="description"
          type="text"
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          
        />
        </div>
        <div className='flex items-baseline space-x-5 text-3xl' > 
        <label htmlFor="category" style={{width:'16.3%'}}>Categoría</label>
          <select 
            className='select w-full max-w-xs '
            name="category" 
            id="category"
            onChange={e => setCategory(e.target.value)}   
            
          >
            <option id="option1"value="Educación">Educación</option>
            <option id="option2"value="Psicología">Psicología</option>
            <option id="option3"value="Jurídico">Jurídico</option>
          </select>
        </div>

        <div className='grid grid-flow-col auto-cols-max'>

          <div className='flex items-baseline space-x-5 text-3xl mt-3 '>
            <label htmlFor="isForMobile">Para niños</label> 
          </div>

          <div className="mt-5 ml-10">
            <input
              type="checkbox"
              id="isForMobile"
              name="isForMobile"
              value=""
              checked={isChecked}
              onChange={handleOnChange}
              className="checkbox"
            />
          </div>
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
                    className='file-input file-input-bordered w-full max-w-xs ' 
                    onChange={e => setNewVideo(e.target.files[0])}
                  />
                </div>

                <div className= ''>
                    {!isWaiting &&(
                      <button class="btn btn-success disabled:opacity-50">Editar</button>
                    )}
                  
                  {!isWaiting &&(
                      <button hidden={false} class="btn btn-error" style={{ marginLeft: '12px'}}onClick={() => setIsEditing(false)}>Cancelar</button>
                    )}
                    {isWaiting &&(
                      <div className="flex items-center justify-center mt-10">
                        <progress className="progress w-80"></progress>
                      </div>
                    )}
                </div>

              </div>
      
            </div>

            <div className='col-span-1'>
              <label className='text-3xl' >Video actual</label>

              <video width="560" height="315" controls autoPlay muted>
                  <source src={video} type="video/mp4"/>
              </video>

            </div>  

          </div>

        </div>
        
      </form>
    </div>
  );
};

export default Edit;
