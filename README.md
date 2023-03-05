# API rest Ferretería

💥[**Link de la API**](https://api-ferreteria.fly.dev/ "**Link de la API**")💥

## ✅ introducion:
Este repositorio es un proyecto en el cual consiste en el desarrollo de los principios básicos de una API REST, usando los métodos GET,  POST, PUT y DELETE. En este proyecto se usó tecnologías como Node, Express y MySQL.

## ✅ ¿Como consumir la API?

Para poder consumir la API por favor visite la documentación en la siguiente dirección [**Link de la API**](https://api-ferreteria.fly.dev/ "**Link de la API**")

## ✅ Instalación localmente
Para poder empezar a usar el proyecto es nesesario tener instalado NodeJS y un servidor MySQL.

**Pasos para empezar:**

1.Crear la DB en tu servidor MySQL, crea una base de datos llamado "Tlapaleria".

2.Crea una tabla con las siguientes caracteristicas:
- id INT PK AUTOINCREMENT
- nombre VARCHAR(64)
- precio INT
- img VARCHAR(512)
- fechaCreacion DATETIME


3.Configura el archivo ./app.js según la configuración  de tu servidor MySQL.

    const DB_HOST = process.env.DB_HOST || 'localhost'			//Edit
    const DB_USER = process.env.DB_USER || 'root'					//Edit
    const DB_PASSWORD = process.env.DB_PASSWORD || ''	 //Edit
    const DB_NAME = process.env.DB_NAME || 'Tlapaleria'
    const DB_PORT = process.env.DB_PORT || 3306					//Edit


4.Utiliza el siguiente comando para encender el servidor de la API.

    node app.js

Output:

    Coneccion a ApiRest exitosa 
    example app listening on port 3000

