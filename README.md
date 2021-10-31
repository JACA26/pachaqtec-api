# PachaQTec API
## Endpoints
---
### LOGIN
    POST: {{url}}/api/login

- Recibe los campos de email y password


---

### USERS LIST
    GET: {{url}}/api/users'
    HEADER: {token: String}

- Obtiene todos los usuarios.
- Necesita que el token sea enviado en el header de la petición.

---

### USER DATA
    GET: {{url}}/api/users/:id'
    HEADER: {token: String}

- Obtiene todos los campos de un usuario.
- Necesita que el token sea enviado en el header de la petición.

---


### USER DATA TO EDIT
    GET: {{url}}/api/users/:id'
    HEADER: {token: String}

- Obtiene los campos necesarios para editar el usuario.
- No obtiene el email
- Necesita que el token sea enviado en el header de la petición.

---


### CREATE USER (Register)
    POST: {{url}}/api/users'
- Crea un usuario
- No necesita token


---


### UPDATE USER
    PUT: {{url}}/api/users/:id'
    HEADER: {token: String}

- Actualiza el usuario
- No actualiza email
- Necesita que el token sea enviado en el header de la petición.


---


### DELETE USER
    PUT: {{url}}/api/users/:id'
    HEADER: {token: String}

- Elimina el usuario
- Por buenas practicas, el usuario no es eliminado de la DB, sino pasa a un estado inactivo
- Necesita que el token sea enviado en el header de la petición.


---


### USER PROFILE LIST
    PUT: {{url}}/api/users/profiles'
    HEADER: {token: String}

- Obtiene una lista de los campos necesarios para mostrar el perfil de los usuarios.
- Necesita que el token sea enviado en el header de la petición.


---


### UPDATE USER
    PUT: {{url}}/api/users/profiles/:id'
    HEADER: {token: String}

- Actualiza el perfil del usuario
- Necesita que el token sea enviado en el header de la petición.
router.put('/users/profiles/:id', verificarToken, updateProfile);