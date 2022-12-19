import React from 'react'

const EditUserView = ({ submitHandler,rut,nombre,setNombre,setRut }:any) => {
    return (
        <div>
            <div className=" flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto   lg:max-w-xl">
                <div className=' card-bordered border-neutral px-10 py-20 rounded-3xl border-2 '>
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-cyan-500">
                        Editar Usuario
                        </h2>
                    </div>	

                    <div className='card-body'> 
                        <form onSubmit={submitHandler}>
                            <div className="-space-y-px rounded-md shadow-sm">
                                <label>
                                    Nombre:
                                <input value={nombre} onChange={(e)=>setNombre(e.target.value)} type="text" id="name" required autoComplete="Nombre" className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"/>
                                </label>
                                <br></br>

                                <label>
                                    Rut:
                                <input value={rut} onChange={(e)=>setRut(e.target.value)} type="text" id="rut" required autoComplete="Rut" className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"/>
                                </label>
                                <br></br>

                                <div className='flex flex-col items-center'>
                                    <button type="submit" className="btn btn-wide">Editar</button>

                                </div>  
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default EditUserView