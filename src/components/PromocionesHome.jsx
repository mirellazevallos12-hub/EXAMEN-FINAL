export default function PromocionesHome({ onViewDetail }) {
  const promociones = [
    {
      id: 1,
      titulo: '20% en pasajes',
      subtitulo: 'Solo por la web',
      imagen: '/images/machu picchu.jpg',
      descripcion: 'Descuento especial',
      origen: 'LIMA',
      destino: 'CUSCO',
      horarios: [
        { hora: '08:00', asientos: 12, precio: 85 },
        { hora: '14:30', asientos: 8, precio: 85 },
        { hora: '20:00', asientos: 5, precio: 100 },
      ],
      duracion: '12 horas'
    },
    {
      id: 2,
      titulo: '¡Semana Santa!',
      subtitulo: 'Promociones increíbles',
      descripcion: 'HUARAZ - AYACUCHO\nSELVA CENTRAL - OXAPAMPA',
      imagen: '/images/trujillo.jpeg',
      origen: 'HUARAZ',
      destino: 'AYACUCHO',
      horarios: [
        { hora: '07:00', asientos: 15, precio: 60 },
        { hora: '15:00', asientos: 10, precio: 60 },
        { hora: '22:00', asientos: 3, precio: 75 },
      ],
      duracion: '8 horas'
    },
    {
      id: 3,
      titulo: '20% en pasajes',
      subtitulo: 'Black Friday',
      descripcion: 'Oferta limitada',
      imagen: '/images/arequipa.webp',
      origen: 'LIMA',
      destino: 'AREQUIPA',
      horarios: [
        { hora: '09:00', asientos: 20, precio: 110 },
        { hora: '16:00', asientos: 16, precio: 110 },
      ],
      duracion: '16 horas'
    },
    {
      id: 4,
      titulo: 'FIESTAS PATRIAS',
      subtitulo: 'Especial de julio',
      descripcion: 'Múltiples destinos disponibles',
      imagen: '/images/puno.jpg',
      origen: 'LIMA',
      destino: 'TACNA',
      horarios: [
        { hora: '10:00', asientos: 18, precio: 95 },
        { hora: '18:30', asientos: 12, precio: 95 },
      ],
      duracion: '18 horas'
    }
  ];

  return (
    <div className="promociones-container">
      <div className="promociones-grid">
        {promociones.map((promo) => (
          <div key={promo.id} className="tarjeta-promocion">
            <div 
              className="promo-imagen"
              style={{ backgroundImage: `url(${promo.imagen})` }}
            >
              <div className="promo-overlay"></div>
            </div>
            <div className="promo-contenido">
              <h3 className="promo-titulo">{promo.titulo}</h3>
              {promo.subtitulo && <p className="promo-subtitulo">{promo.subtitulo}</p>}
              {promo.descripcion && <p className="promo-descripcion">{promo.descripcion}</p>}
              <button 
                className="btn-ver-detalles"
                onClick={() => onViewDetail?.(promo)}
              >
                VER DETALLES
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
