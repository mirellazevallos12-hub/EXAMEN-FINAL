export default function SelectorFecha({ fechaNacimiento, alCambiar }) {
  return (
    <div className="date-inputs">
      <select
        name="dia"
        value={fechaNacimiento.dia}
        onChange={alCambiar}
        className="date-select"
      >
        <option value="">Día</option>
        {Array.from({ length: 31 }, (_, i) => i + 1).map(dia => (
          <option key={dia} value={dia}>
            {String(dia).padStart(2, '0')}
          </option>
        ))}
      </select>

      <select
        name="mes"
        value={fechaNacimiento.mes}
        onChange={alCambiar}
        className="date-select"
      >
        <option value="">Mes</option>
        {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map((mes, idx) => (
          <option key={idx} value={idx + 1}>
            {mes}
          </option>
        ))}
      </select>

      <select
        name="año"
        value={fechaNacimiento.año}
        onChange={alCambiar}
        className="date-select"
      >
        <option value="">Año</option>
        {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(año => (
          <option key={año} value={año}>
            {año}
          </option>
        ))}
      </select>
    </div>
  );
}
