export interface MapLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'cenote' | 'archaeological';
  description: string;
  image: string;
}

export const mapLocations: MapLocation[] = [
  // CENOTES
  {
    id: 'gran-cenote',
    name: 'Gran Cenote',
    lat: 20.2461,
    lng: -87.4636,
    type: 'cenote',
    description: 'Uno de los cenotes más famosos, famoso por sus aguas cristalinas y tortugas.',
    image: '/tours/cenote.png'
  },
  {
    id: 'dos-ojos',
    name: 'Cenote Dos Ojos',
    lat: 20.3235,
    lng: -87.3877,
    type: 'cenote',
    description: 'Un paraíso para buceadores con dos cuevas conectadas.',
    image: '/tours/cenote.png'
  },
  {
    id: 'cenote-azul',
    name: 'Cenote Azul',
    lat: 20.4907,
    lng: -87.2198,
    type: 'cenote',
    description: 'Cenote abierto perfecto para familias y nadar tranquilamente.',
    image: '/tours/cenote.png'
  },
  {
    id: 'cenote-calavera',
    name: 'Cenote Calavera',
    lat: 20.2269,
    lng: -87.4665,
    type: 'cenote',
    description: 'Conocido como el "Templo de la Muerte", es un agujero circular impresionante.',
    image: '/tours/cenote.png'
  },
  // ZONAS ARQUEOLÓGICAS
  {
    id: 'chichen-itza',
    name: 'Chichén Itzá',
    lat: 20.6843,
    lng: -88.5678,
    type: 'archaeological',
    description: 'Una de las siete maravillas del mundo moderno.',
    image: '/tours/pyramid.png'
  },
  {
    id: 'tulum-ruins',
    name: 'Tulum Ruins',
    lat: 20.2147,
    lng: -87.4288,
    type: 'archaeological',
    description: 'Antigua ciudad maya amurallada situada frente al Mar Caribe.',
    image: '/tours/tulum.png'
  },
  {
    id: 'coba',
    name: 'Cobá',
    lat: 20.4911,
    lng: -87.7324,
    type: 'archaeological',
    description: 'Hogar de la pirámide Nohoch Mul, la más alta de la región.',
    image: '/tours/pyramid.png'
  },
  {
    id: 'ek-balam',
    name: 'Ek Balam',
    lat: 20.8911,
    lng: -88.1361,
    type: 'archaeological',
    description: 'Famoso por su Acrópolis y la entrada en forma de jaguar.',
    image: '/tours/pyramid.png'
  }
];
