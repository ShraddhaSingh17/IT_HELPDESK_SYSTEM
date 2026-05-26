const isDev = window.location.hostname === "localhost" ;

export const API_BASE_URL = isDev
? "http://localhost/server"
: "https://localhost/server"