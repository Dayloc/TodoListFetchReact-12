import React, { useState } from "react";
import UsuarioManager from "./UsuarioManager";
import TareasUsuario from "./TareasDeUsuario";
import "../../styles/index.css";

function AgregarTarea() {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  return (
    <div>
      {usuarioSeleccionado ? (
        <TareasUsuario
          userName={usuarioSeleccionado}
          onVolver={() => setUsuarioSeleccionado(null)}
        />
      ) : (
        <UsuarioManager onUsuarioSeleccionado={setUsuarioSeleccionado} />
      )}
    </div>
  );
}

export default AgregarTarea;