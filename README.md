
## Requisitos 

- node>=v16 && npm >=8.19 o Docker >= 24 instalados
- json valido respecto la estructura del enunciado.

## Installation

```bash
$ npm install



# Docker build
$ docker build -t tln-kombat .

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# Docker run
$ docker run -p3000:3000 tln-kombat
```


# USO (ejemplo con cURL)

```bash
$ curl --location 'http://localhost:3000/talana-kombat' \
--header 'Content-Type: application/json' \
--data '{
    "player1": {
        "movimientos": [
            "D",
            "DSD",
            "S",
            "DSD",
            "SD"
        ],
        "golpes": [
            "K",
            "P",
            "",
            "K",
            "P"
        ]
    },
    "player2": {
        "movimientos": [
            "SA",
            "SA",
            "SA",
            "ASA",
            "SA"
        ],
        "golpes": [
            "K",
            "",
            "K",
            "P",
            "P"
        ]
    }
}'
```

## descripcion solución

se modela en nestjs un modulo principal  llamado jrpg (japan rol player game) el cual tiene un controlador que recibe vía post la data de un kombate.
se procesa el request por kombatService el cual se vale de las clases de dominio Fighter, Action, CharacterAction, AttackResult para responder el resultado de un kombate


## asumisiones

- la validación de los datos de entrada es case sensitive y solo son aceptados movimientos y golpes en mayuscula (W S A D) (P y K).
- se declara ganador de le pelea a aquel peleador que tiene más energía una vez terminados todos los movimientos si es que ninguno llega a cero energia


## TO-DO
- Documentar api (con swagger por ejemplo)
- aumentar coverage en tests  (extender a controlador)
- agregar persistencia principalmente de acciones de personajes y registro de peleas quizá
- si se agrega persistencia, agregar docker compose para manejar containers separados. 
- incluir logger service