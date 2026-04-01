export default function DateSelector({ fechaNacimiento, onChange }) {
  return (
    <div className="date-inputs">
      <select
        name="dia"
        value={fechaNacimiento.dia}
        onChange={onChange}
        className="date-select"
      >
        <option value="">Día</option>
        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
          <option key={day} value={day}>
            {String(day).padStart(2, '0')}
          </option>
        ))}
      </select>

      <select
        name="mes"
        value={fechaNacimiento.mes}
        onChange={onChange}
        className="date-select"
      >
        <option value="">Mes</option>
        {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map((month, idx) => (
          <option key={idx} value={idx + 1}>
            {month}
          </option>
        ))}
      </select>

      <select
        name="año"
        value={fechaNacimiento.año}
        onChange={onChange}
        className="date-select"
      >
        <option value="">Año</option>
        {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}
