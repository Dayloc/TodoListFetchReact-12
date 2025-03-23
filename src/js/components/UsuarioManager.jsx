import React, { useState, useEffect } from "react";
import '../../styles/index.css';

function UsuarioManager({ onUsuarioSeleccionado }) {
  const [userName, setUserName] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [usuarioCreado, setUsuarioCreado] = useState(null);
  const apiUrl = "https://playground.4geeks.com/todo";

  // Función para obtener la lista de usuarios
  const fetchUsuarios = async () => {
    try {
      const response = await fetch(`${apiUrl}/users`);
      if (!response.ok) throw new Error("Error al obtener la lista de usuarios");
      const data = await response.json();
      setUsuarios(data.users || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Función para crear un usuario
  const crearUsuario = async () => {
    if (userName.trim() === "") {
      setMensaje("El nombre de usuario no puede estar vacío");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/users/${userName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Error al crear el usuario");

      setMensaje(`Usuario "${userName}" creado exitosamente`);
      setUsuarioCreado(userName); // Resaltar el usuario creado
      fetchUsuarios(); // Actualizar la lista de usuarios
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Error al crear el usuario. ¿Ya existe?");
    }
  };

  // Función para eliminar un usuario
  const eliminarUsuario = async (userName) => {
    try {
      const response = await fetch(`${apiUrl}/users/${userName}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar el usuario");

      setMensaje(`Usuario "${userName}" eliminado exitosamente`);
      fetchUsuarios(); // Actualizar la lista de usuarios
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Error al eliminar el usuario");
    }
  };

  // Obtener la lista de usuarios al cargar el componente
  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div className="usuario-manager">
      <h2>Gestión de Usuarios</h2>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="input-usuario"
      />
      <button onClick={crearUsuario} className="boton-crear">
        Crear Usuario
      </button>
      {mensaje && <p className="mensaje">{mensaje}</p>}

      <h3>Lista de Usuarios</h3>
      <ul className="lista-usuarios">
        {usuarios.map((usuario, index) => (
          <li
            key={index}
            className={`usuario-item ${
              usuario.name === usuarioCreado ? "usuario-creado" : ""
            }`}
          >
            <span
              className="nombre-usuario"
              onClick={() => onUsuarioSeleccionado(usuario.name)} // Navegar a las tareas del usuario
            >
              {usuario.name}
            </span>
            <button
              className="boton-eliminar"
              onClick={() => eliminarUsuario(usuario.name)} // Eliminar el usuario
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsuarioManager;