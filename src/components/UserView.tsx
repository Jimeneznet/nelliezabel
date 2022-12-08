import React, { useEffect, useState } from 'react'

import { getData } from '../hooks/userGetData'

const UserView = () => {

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
      <div className="overflow-x-auto">
  <table className="table w-full">
    <thead>
      <tr>
        <th>Index</th>
        <th>Nombre</th>
        <th>Rut</th>
        <th>Correo</th>
        <th>Rol</th>
        <th>Status</th>
        <th>Editar</th>
      </tr>
    </thead>
    <tbody>
    {usuarios.map((user: any, index: number) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{user.nombre}</td>
              <td>{user.rut}</td>
              <td>{user.email}</td>
              <td>{user.rol}</td>
              if (user.status=='1') {
                <td>Activo</td>
              }
              else{
                <td>Desabilitado</td>
              }
              <td>{user.status}</td>
            </tr>))}
    </tbody>
  </table>
</div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Correo</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {loading && <tr><td>Cargando...</td></tr>}
          {usuarios.map((user: any, index: number) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{user.email}</td>
              <td>{user.rol}</td>
            </tr>))}
        </tbody>
      </table>
    </div>
  )
}

export default UserView