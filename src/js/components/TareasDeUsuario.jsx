import React, { useState, useEffect } from "react";
import '../../styles/index.css';

function TareasUsuario({ userName, onVolver }) {
  const [tarea, setTarea] = useState("");
  const [listaTareas, setListaTareas] = useState([]);
  const [editandoTarea, setEditandoTarea] = useState(null); // Estado para la tarea en edición
  const [nuevoTexto, setNuevoTexto] = useState(""); // Estado para el nuevo texto de la tarea
  const apiUrl = "https://playground.4geeks.com/todo";

  // Función para obtener las tareas del usuario
  const fetchTareas = async () => {
    try {
      const response = await fetch(`${apiUrl}/users/${userName}`);
      if (!response.ok) throw new Error("Error al obtener las tareas");
      const data = await response.json();
      setListaTareas(data.todos || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Cargar las tareas al iniciar el componente
  useEffect(() => {
    fetchTareas();
  }, [userName]);

  // Función para agregar una tarea
  const agregarTarea = async () => {
    if (tarea.trim() === "") return;

    try {
      const response = await fetch(`${apiUrl}/todos/${userName}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: tarea, is_done: false }),
      });
      if (!response.ok) throw new Error("Error al agregar la tarea");

      fetchTareas(); // Actualizar la lista de tareas
      setTarea("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Función para eliminar una tarea
  const eliminarTarea = async (todoId) => {
    try {
      const response = await fetch(`${apiUrl}/todos/${todoId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar la tarea");

      fetchTareas(); // Actualizar la lista de tareas
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Función para actualizar una tarea
  const actualizarTarea = async (todoId) => {
    if (nuevoTexto.trim() === "") return;

    try {
      const response = await fetch(`${apiUrl}/todos/${todoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: nuevoTexto }),
      });
      if (!response.ok) throw new Error("Error al actualizar la tarea");

      fetchTareas(); // Actualizar la lista de tareas
      setEditandoTarea(null); // Salir del modo de edición
      setNuevoTexto(""); // Limpiar el input de edición
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Función para manejar la tecla presionada
  const handleKeyDown = (e) => {
    if (e.key === "Enter") agregarTarea();
  };

  return (
    <div className="tareas-usuario">
      <h2>Tareas de {userName}</h2>
      <button onClick={onVolver} className="boton-volver">
        Volver a la lista de usuarios
      </button>

      <input
        type="text"
        placeholder="Agrega una tarea"
        value={tarea}
        onChange={(e) => setTarea(e.target.value)}
        onKeyDown={handleKeyDown}
        className="input-tarea"
      />
      <button onClick={agregarTarea} className="boton-agregar">
        Agregar
      </button>

      {listaTareas.length === 0 ? (
        <p className="mensaje-vacio">No hay tareas, añadir tareas</p>
      ) : (
        <ul className="lista-tareas">
          {listaTareas.map((tarea) => (
            <li key={tarea.id} className="tarea-item">
              {editandoTarea === tarea.id ? (
                <>
                  <input
                    type="text"
                    value={nuevoTexto}
                    onChange={(e) => setNuevoTexto(e.target.value)}
                    className="input-tarea"
                  />
                  <button
                    className="boton-actualizar"
                    onClick={() => actualizarTarea(tarea.id)}
                  >
                    Guardar
                  </button>
                  <button
                    className="boton-cancelar"
                    onClick={() => setEditandoTarea(null)}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  {tarea.label}
                  <button
                    className="boton-editar"
                    onClick={() => {
                      setEditandoTarea(tarea.id);
                      setNuevoTexto(tarea.label);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    className="boton-eliminar"
                    onClick={() => eliminarTarea(tarea.id)}
                  >
                    Eliminar
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TareasUsuario;