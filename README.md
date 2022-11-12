# Bienvenidos a Vacunas App

# Enlaces de interés
|Repo|https://github.com/bryanPEREZ1497/vacunasApp |
|--|--|
|App | https://vacunas-k8rhxw0zs-bryanperez1497.vercel.app/ |
|Diagrama ERD| https://lucid.app/users/registerOrLogin/free?showLogin=false&invitationId=inv_67419c2e-355e-452c-9de6-76885586c8f6&productOpt=chart&invitationType=documentAcceptance&returnUrlOverride=%2Flucidchart%2Fb010b3a9-064f-4a06-b1f3-99032190fdf2%2Fedit%3Fviewport_loc%3D15%252C-304%252C2090%252C954%252C0_0%26invitationId%3Dinv_67419c2e-355e-452c-9de6-76885586c8f6 |
|UI Design | https://preview.uxpin.com/2e75ab3cefaac3ac93f3e4a44ee98c14c41f52b1#/pages/159678090/simulate/no-panels |



# Proceso de Ejecución

1. Ingresar a https://vacunas-k8rhxw0zs-bryanperez1497.vercel.app/ como administrador, 
con las credenciales
	usuario: admin@ec.kruger.com
	password: 12345
2. Crear un empleado con los datos requeridos, y recordar el correo y la cédula, que son respectivamente el usuario y password.
3. Salir de la app y volver a entrar como empleado. Se encontrará con formularios con los campos a completar.


# Proceso de Construcción
## Diseño
1. La ui fue diseñada usando UXPin
2. El modelo fue diseñado con LucidChart. Se consideró que el empleado solo es inoculado con un solo tipo de vacuna por un número de dosis, por lo que los campos tipo, estado, fecha de vacunación, dosis están comprendidos dentro del modelo user.
## Implementación
1. Como prerequisitos tener instalado node y VScode 
2. En el back, se inició con npm init, instalando expressjs se incluyó rutas de usuario(empleado), sus manejadores, servicios.
3. En el front se levantó el proyecto usando npm create vite --template react.
4. Frameworks CSS usados MUI, librerías SweetAlert2, DatePicker, reack-hook-form, yup (validación de campos), axios, react-router-dom.
5. Configuración del proyecto: Configuración de estructura del proyecto, cada modulo tiene una estructura determinada, con su propias pages, routes, etc. Preparar los hooks, services, theme.
5.1 Layout son componentes de React padres de todo, directamente de las pages
5.2 Pages son componentes de React padres de views o de componentes.
5.3 Components son usados como hijos de views o de pages.
5.4 Routes con tiene el archivo con las rutas apuntando a las diferentes páginas del módulo.
5.5 Theme es un archivo que proporciona un ThemeProvider, un wrapper de la AppRouter
5.6 Los archivos index.js son llamados archivos de barril útiles para importaciones one line
5.7 El modulo de admin tiene rutas protegidas anidadas en Privates Routes
5.8 Formularios. useForm es un hook que proporciona register method para incluir cada campo del formulario, y yup nos ayuda a validarlos con extremada facilidad, definiendo un esquema, además de definir los diferentes mensajes de error ya que están en inglés por defecto. Match es un validator que recibe una expresión regular, se usó para validar los nombres y la cédula. Finalmente, una vez todo los campos resultan ser válidos, se ejecuta el metódo onSubmit.
5.9 La validación de que la cédula sea única se realiza tanto en el front como en el back.
6. En términos generales
6.1 Se usó React con Hooks, en su versión 18.
6.2 Los componentes usados son componentes funcionales, de esa manera se pueden usar los hooks.
6.3 Los hooks dentro del directorios del mismo nombre contienen la lógica para hacer llamadas al backend. En este caso, se usó Axios como cliente HTTP para lograrlo. Gracias a Axios se puede crear una instancia dentro de la cual se envía siempre el JWT de autenticación en cada llamada.
**6.4 Cuando el admin crea un empleado, este puede acceder a la app con el correo como usuario y la cédula como contraseña**
### Despliegue
El backend se encuentra en heroku.
El frontend se encuentra desplegado en Vercel. El link para acceder a la app se encuentra al principio de esta documentación así como en el mismo repositorio.


*

## Muchas gracias
Bryan Pérez

*
