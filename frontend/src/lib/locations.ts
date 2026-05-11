export interface LocationState {
  name: string;
  cities: string[];
}

export interface LocationCountry {
  name: string;
  states: LocationState[];
}

export const locationCatalog: LocationCountry[] = [
  {
    name: "Mexico",
    states: [
      {
        name: "Aguascalientes",
        cities: ["Aguascalientes", "Calvillo", "Jesus Maria", "Pabellon de Arteaga", "Rincon de Romos"],
      },
      {
        name: "Baja California",
        cities: ["Ensenada", "Mexicali", "Rosarito", "San Felipe", "Tecate", "Tijuana"],
      },
      {
        name: "Baja California Sur",
        cities: ["Cabo San Lucas", "Ciudad Constitucion", "La Paz", "Loreto", "San Jose del Cabo"],
      },
      {
        name: "Campeche",
        cities: ["Campeche", "Carmen", "Champoton", "Calkini", "Escarcega"],
      },
      {
        name: "Chiapas",
        cities: ["Comitan", "Palenque", "San Cristobal de las Casas", "Tapachula", "Tuxtla Gutierrez"],
      },
      {
        name: "Chihuahua",
        cities: ["Camargo", "Chihuahua", "Cuauhtemoc", "Delicias", "Hidalgo del Parral", "Juarez"],
      },
      {
        name: "Coahuila",
        cities: ["Acuña", "Monclova", "Piedras Negras", "Ramos Arizpe", "Saltillo", "Torreon"],
      },
      {
        name: "Colima",
        cities: ["Colima", "Manzanillo", "Tecoman", "Villa de Alvarez", "Armeria"],
      },
      {
        name: "Ciudad de Mexico",
        cities: ["Alvaro Obregon", "Benito Juarez", "Coyoacan", "Cuauhtemoc", "Gustavo A. Madero", "Iztapalapa", "Tlalpan"],
      },
      {
        name: "Durango",
        cities: ["Durango", "Gomez Palacio", "Lerdo", "Pueblo Nuevo", "Santiago Papasquiaro"],
      },
      {
        name: "Estado de Mexico",
        cities: ["Atizapan de Zaragoza", "Cuautitlan Izcalli", "Ecatepec", "Metepec", "Naucalpan", "Nezahualcoyotl", "Toluca"],
      },
      {
        name: "Guanajuato",
        cities: ["Celaya", "Guanajuato", "Irapuato", "Leon", "Salamanca", "San Miguel de Allende"],
      },
      {
        name: "Guerrero",
        cities: ["Acapulco", "Chilpancingo", "Iguala", "Taxco", "Zihuatanejo"],
      },
      {
        name: "Hidalgo",
        cities: ["Actopan", "Pachuca", "Tizayuca", "Tula", "Tulancingo"],
      },
      {
        name: "Jalisco",
        cities: ["Guadalajara", "Lagos de Moreno", "Puerto Vallarta", "Tepatitlan", "Tlaquepaque", "Tonala", "Zapopan"],
      },
      {
        name: "Morelos",
        cities: ["Cuautla", "Cuernavaca", "Jiutepec", "Temixco", "Xochitepec", "Yautepec"],
      },
      {
        name: "Michoacan",
        cities: ["Apatzingan", "La Piedad", "Morelia", "Uruapan", "Zamora", "Zitacuaro"],
      },
      {
        name: "Nayarit",
        cities: ["Bahia de Banderas", "Compostela", "San Blas", "Santiago Ixcuintla", "Tepic"],
      },
      {
        name: "Nuevo Leon",
        cities: ["Apodaca", "Escobedo", "Guadalupe", "Monterrey", "San Nicolas de los Garza", "San Pedro Garza Garcia", "Santa Catarina"],
      },
      {
        name: "Oaxaca",
        cities: ["Huajuapan de Leon", "Juchitan", "Oaxaca de Juarez", "Puerto Escondido", "Salina Cruz", "Tuxtepec"],
      },
      {
        name: "Quintana Roo",
        cities: ["Cancun", "Chetumal", "Cozumel", "Isla Mujeres", "Playa del Carmen", "Tulum"],
      },
      {
        name: "Puebla",
        cities: ["Atlixco", "Cholula", "Huauchinango", "Puebla", "San Martin Texmelucan", "Tehuacan"],
      },
      {
        name: "Queretaro",
        cities: ["Cadereyta", "El Marques", "Queretaro", "San Juan del Rio", "Tequisquiapan"],
      },
      {
        name: "San Luis Potosi",
        cities: ["Ciudad Fernandez", "Ciudad Valles", "Matehuala", "Rioverde", "San Luis Potosi", "Soledad de Graciano Sanchez"],
      },
      {
        name: "Sinaloa",
        cities: ["Ahome", "Culiacan", "Guamuchil", "Guasave", "Los Mochis", "Mazatlan"],
      },
      {
        name: "Sonora",
        cities: ["Cajeme", "Guaymas", "Hermosillo", "Navojoa", "Nogales", "Puerto Penasco"],
      },
      {
        name: "Tabasco",
        cities: ["Cardenas", "Centla", "Comalcalco", "Macuspana", "Paraiso", "Villahermosa"],
      },
      {
        name: "Tamaulipas",
        cities: ["Ciudad Madero", "Ciudad Victoria", "Matamoros", "Nuevo Laredo", "Reynosa", "Tampico"],
      },
      {
        name: "Tlaxcala",
        cities: ["Apizaco", "Huamantla", "San Pablo del Monte", "Tlaxcala", "Zacatelco"],
      },
      {
        name: "Veracruz",
        cities: ["Boca del Rio", "Coatzacoalcos", "Cordoba", "Orizaba", "Poza Rica", "Veracruz", "Xalapa"],
      },
      {
        name: "Yucatan",
        cities: ["Kanasin", "Merida", "Progreso", "Tekax", "Tizimin", "Valladolid"],
      },
      {
        name: "Zacatecas",
        cities: ["Fresnillo", "Guadalupe", "Jerez", "Rio Grande", "Zacatecas"],
      },
    ],
  },
  {
    name: "Colombia",
    states: [
      {
        name: "Antioquia",
        cities: ["Bello", "Envigado", "Itagui", "Medellin"],
      },
      {
        name: "Bogota D.C.",
        cities: ["Bogota"],
      },
      {
        name: "Cundinamarca",
        cities: ["Chia", "Facatativa", "Soacha", "Zipaquira"],
      },
      {
        name: "Santander",
        cities: ["Barrancabermeja", "Bucaramanga", "Floridablanca"],
      },
      {
        name: "Atlantico",
        cities: ["Barranquilla", "Malambo", "Puerto Colombia", "Soledad"],
      },
      {
        name: "Valle del Cauca",
        cities: ["Buenaventura", "Cali", "Palmira"],
      },
    ],
  },
  {
    name: "Peru",
    states: [
      {
        name: "Arequipa",
        cities: ["Arequipa", "Camana", "Mollendo"],
      },
      {
        name: "Cusco",
        cities: ["Cusco", "Pisac", "Urubamba"],
      },
      {
        name: "Lima",
        cities: ["Callao", "Lima", "Miraflores", "San Isidro"],
      },
      {
        name: "La Libertad",
        cities: ["Chepen", "Pacasmayo", "Trujillo"],
      },
      {
        name: "Piura",
        cities: ["Catacaos", "Paita", "Piura", "Sullana"],
      },
      {
        name: "Junin",
        cities: ["Chanchamayo", "Huancayo", "Jauja", "Tarma"],
      },
    ],
  },
  {
    name: "Argentina",
    states: [
      {
        name: "Buenos Aires",
        cities: ["La Plata", "Mar del Plata", "Quilmes"],
      },
      {
        name: "Cordoba",
        cities: ["Cordoba", "Rio Cuarto", "Villa Carlos Paz"],
      },
      {
        name: "Santa Fe",
        cities: ["Rosario", "Santa Fe", "Venado Tuerto"],
      },
      {
        name: "Mendoza",
        cities: ["Godoy Cruz", "Guaymallen", "Mendoza", "San Rafael"],
      },
    ],
  },
  {
    name: "Bolivia",
    states: [
      {
        name: "La Paz",
        cities: ["El Alto", "La Paz", "Viacha"],
      },
      {
        name: "Cochabamba",
        cities: ["Cochabamba", "Quillacollo", "Sacaba"],
      },
      {
        name: "Santa Cruz",
        cities: ["Montero", "Santa Cruz de la Sierra", "Warnes"],
      },
    ],
  },
  {
    name: "Brasil",
    states: [
      {
        name: "Sao Paulo",
        cities: ["Campinas", "Guarulhos", "Santos", "Sao Paulo"],
      },
      {
        name: "Rio de Janeiro",
        cities: ["Niteroi", "Petropolis", "Rio de Janeiro", "Volta Redonda"],
      },
      {
        name: "Minas Gerais",
        cities: ["Belo Horizonte", "Contagem", "Juiz de Fora", "Uberlandia"],
      },
      {
        name: "Parana",
        cities: ["Curitiba", "Londrina", "Maringa", "Ponta Grossa"],
      },
    ],
  },
  {
    name: "Chile",
    states: [
      {
        name: "Metropolitana de Santiago",
        cities: ["Las Condes", "Maipu", "Providencia", "Santiago"],
      },
      {
        name: "Valparaiso",
        cities: ["Quilpue", "Valparaiso", "Vina del Mar"],
      },
      {
        name: "Biobio",
        cities: ["Chiguayante", "Concepcion", "Talcahuano"],
      },
      {
        name: "Antofagasta",
        cities: ["Antofagasta", "Calama", "Mejillones"],
      },
    ],
  },
  {
    name: "Ecuador",
    states: [
      {
        name: "Guayas",
        cities: ["Daule", "Duran", "Guayaquil", "Samborondon"],
      },
      {
        name: "Pichincha",
        cities: ["Cayambe", "Quito", "Ruminahui"],
      },
      {
        name: "Azuay",
        cities: ["Cuenca", "Giron", "Paute"],
      },
      {
        name: "Manabi",
        cities: ["Chone", "Manta", "Portoviejo"],
      },
    ],
  },
  {
    name: "Guatemala",
    states: [
      {
        name: "Guatemala",
        cities: ["Amatitlan", "Mixco", "Villa Nueva", "Ciudad de Guatemala"],
      },
      {
        name: "Quetzaltenango",
        cities: ["Coatepeque", "Olintepeque", "Quetzaltenango"],
      },
      {
        name: "Sacatepequez",
        cities: ["Antigua Guatemala", "Ciudad Vieja", "Jocotenango"],
      },
    ],
  },
  {
    name: "Costa Rica",
    states: [
      {
        name: "San Jose",
        cities: ["Desamparados", "Escazu", "San Jose"],
      },
      {
        name: "Alajuela",
        cities: ["Alajuela", "Grecia", "San Ramon"],
      },
      {
        name: "Heredia",
        cities: ["Belen", "Heredia", "Santo Domingo"],
      },
    ],
  },
  {
    name: "Panama",
    states: [
      {
        name: "Panama",
        cities: ["La Chorrera", "Panama", "San Miguelito"],
      },
      {
        name: "Chiriqui",
        cities: ["Boquete", "David", "Puerto Armuelles"],
      },
      {
        name: "Colon",
        cities: ["Colon", "Portobelo", "Sabanitas"],
      },
    ],
  },
  {
    name: "Paraguay",
    states: [
      {
        name: "Central",
        cities: ["Capiata", "Fernando de la Mora", "Luque", "San Lorenzo"],
      },
      {
        name: "Asuncion",
        cities: ["Asuncion"],
      },
      {
        name: "Alto Parana",
        cities: ["Ciudad del Este", "Hernandarias", "Presidente Franco"],
      },
    ],
  },
  {
    name: "Estados Unidos",
    states: [
      {
        name: "California",
        cities: ["Los Angeles", "San Diego", "San Francisco", "San Jose"],
      },
      {
        name: "Florida",
        cities: ["Miami", "Orlando", "Tampa"],
      },
      {
        name: "Illinois",
        cities: ["Aurora", "Chicago", "Naperville"],
      },
      {
        name: "New York",
        cities: ["Albany", "Buffalo", "New York City", "Rochester"],
      },
      {
        name: "Texas",
        cities: ["Austin", "Dallas", "Houston", "San Antonio"],
      },
      {
        name: "Washington",
        cities: ["Bellevue", "Seattle", "Spokane", "Tacoma"],
      },
    ],
  },
  {
    name: "Uruguay",
    states: [
      {
        name: "Montevideo",
        cities: ["Montevideo"],
      },
      {
        name: "Canelones",
        cities: ["Ciudad de la Costa", "Las Piedras", "Pando"],
      },
      {
        name: "Maldonado",
        cities: ["Maldonado", "Piriapolis", "Punta del Este"],
      },
    ],
  },
  {
    name: "Venezuela",
    states: [
      {
        name: "Distrito Capital",
        cities: ["Caracas"],
      },
      {
        name: "Miranda",
        cities: ["Guarenas", "Los Teques", "Petare"],
      },
      {
        name: "Zulia",
        cities: ["Cabimas", "Ciudad Ojeda", "Maracaibo"],
      },
    ],
  },
  {
    name: "Espana",
    states: [
      {
        name: "Andalucia",
        cities: ["Malaga", "Sevilla", "Cadiz", "Granada"],
      },
      {
        name: "Cataluna",
        cities: ["Barcelona", "Girona", "Lleida", "Tarragona"],
      },
      {
        name: "Madrid",
        cities: ["Alcala de Henares", "Getafe", "Madrid", "Mostoles"],
      },
      {
        name: "Valencia",
        cities: ["Alicante", "Castellon de la Plana", "Elche", "Valencia"],
      },
    ],
  },
];

export function findCountry(name: string) {
  return locationCatalog.find((country) => country.name === name);
}

export function findState(countryName: string, stateName: string) {
  return findCountry(countryName)?.states.find((state) => state.name === stateName);
}
