import React from 'react'

const LoginView = ({ submitHandler }: any) => {
    return (
        <div className=" flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto   lg:max-w-xl">
                <div className=' card-bordered border-neutral px-10 py-20 rounded-3xl border-2 '>
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-cyan-500">
                        Inicio de sesion
                        </h2>
                    </div>	

                    <div className='card-body'> 
                        <form onSubmit={submitHandler}>
                            <div className="-space-y-px rounded-md shadow-sm">
                                
                                <label>
                                    Correo electrónico:
                                <input type="email" id="email" required autoComplete="Correo Electronico" className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"/>
                                </label>
                                <br></br>

                                <label>
                                    Contraseña:
                                <input type="password" id="password" required autoComplete="Contraseña" className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"/>
                                </label>
                                <br></br>                               
                                <br></br>
                                <div className='flex flex-col items-center'>
                                    <button type="submit" className="btn btn-wide">Ingresar</button>

                                </div>  
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
        
    )
}

export default LoginView