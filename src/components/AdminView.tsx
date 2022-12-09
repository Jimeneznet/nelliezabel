import React, { useEffect, useState } from 'react'

import { getData } from '../hooks/userGetData'
import {updateUserStatus} from '../hooks/userUpdateStatus'


const AdminView = () => {

  const [usuarios, setUsuarios]: any = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    setLoading(true)
    setUsuarios([]);

    getData().then((users: any) => users.forEach((element: any) => {
      setUsuarios((old: any) => [...old, element.data()])

      
    })).finally(()=>setLoading(false));
    

  }, [])

  return (
    <div>
      <a href="/register"><button className='btn'>Agregar</button></a>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Rut</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Status</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
          {usuarios.map((user: any, index: number) => (
                  <tr key={index}>
                    <td>{user.nombre}</td>
                    <td>{user.rut}</td>
                    <td>{user.email}</td>
                    <td>{user.rol}</td>
                    <td>{user.status}</td>
                    <td><a className='btn'href={`/admin/users/edit/${user.uid}`}> editar</a></td>
                    <td><button className='btn' onClick={() => updateUserStatus(user.uid,user.status)}> cambiar status</button></td>

                  </tr>))}
          </tbody>
        </table>
    </div>
      
  </div>
  )
}

export default AdminView