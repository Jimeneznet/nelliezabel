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