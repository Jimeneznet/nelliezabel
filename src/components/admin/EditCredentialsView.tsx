import React from 'react'

const EditCredentialsView = ({ submitHandler,email,password,verification,setEmail,setPassword, setVerification }:any) => {
    return (
        <div>
            <div className=" flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto   lg:max-w-xl">
                <div className=' card-bordered border-neutral px-10 py-20 rounded-3xl border-2 '>
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-cyan-500">
                        Editar Credenciales
                        </h2>
                    </div>	

                    <div className='card-body'> 
                        <form onSubmit={submitHandler}>
                            <div className="-space-y-px rounded-md shadow-sm">
                                <label>
                                    Correo:
                                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" id="email" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"/>
                                </label>
                                <br></br>

                                <label>
                                    Contraseña:
                                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"/>
                                </label>
                                <br></br>

                                <label>
                                    Confirmar Contraseña:
                                <input value={verification} onChange={(e)=>setVerification(e.target.value)} type="password" id="verification" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"/>
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

export default EditCredentialsView