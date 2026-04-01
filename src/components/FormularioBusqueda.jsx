import { useState } from 'react';

export default function FormularioBusqueda() {
  const [formulario, setFormulario] = useState({
    origen: 'LIMA',
    destino: '',
    fechaSalida: '',
    fechaRetorno: '',
    pasajeros: '1'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    console.log('Buscando pasajes:', formulario);
  };

  return (
    <div className="formulario-busqueda-container">
      <form className="formulario-busqueda" onSubmit={handleBuscar}>
        <div className="titulo-formulario">
          <h3>COMPRA TU PASAJE</h3>
        </div>

        <div className="campos-formulario">
          <div className="campo">
            <label htmlFor="origen">Origen:</label>
            <select 
              id="origen"
              name="origen" 
              value={formulario.origen}
              onChange={handleChange}
              className="input-campo"
            >
              <option value="LIMA">LIMA</option>
              <option value="Arequipa">Arequipa</option>
              <option value="Cusco">Cusco</option>
              <option value="Trujillo">Trujillo</option>
            </select>
          </div>

          <div className="campo">
            <label htmlFor="destino">Destino:</label>
            <select 
              id="destino"
              name="destino" 
              value={formulario.destino}
              onChange={handleChange}
              className="input-campo"
            >
              <option value="">Seleccionar</option>
              <option value="tringo-maria">Tringo Maria</option>
              <option value="huancayo">Huancayo</option>
              <option value="ayacucho">Ayacucho</option>
              <option value="pucallpa">Pucallpa</option>
            </select>
          </div>

          <div className="campo">
            <label htmlFor="fechaSalida">Fecha Salida:</label>
            <input 
              type="date"
              id="fechaSalida"
              name="fechaSalida" 
              value={formulario.fechaSalida}
              onChange={handleChange}
              className="input-campo"
              placeholder="dd/mm/yy"
            />
          </div>

          <div className="campo">
            <label htmlFor="fechaRetorno">Fecha Retorno:</label>
            <input 
              type="date"
              id="fechaRetorno"
              name="fechaRetorno" 
              value={formulario.fechaRetorno}
              onChange={handleChange}
              className="input-campo"
              placeholder="dd/mm/yy"
            />
          </div>

          <div className="campo">
            <label htmlFor="pasajeros">Nº Pasajeros:</label>
            <select 
              id="pasajeros"
              name="pasajeros" 
              value={formulario.pasajeros}
              onChange={handleChange}
              className="input-campo"
            >
              {Array.from({ length: 7 }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>{num} pasajero{num > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn-buscar">
          BUSCAR
        </button>
      </form>
    </div>
  );
}
