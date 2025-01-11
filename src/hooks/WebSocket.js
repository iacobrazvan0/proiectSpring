const token = localStorage.getItem('token');  // Verifică tokenul din localStorage
const wsUrl = `ws://localhost:9090/ws?token=${encodeURIComponent(token.replace('Bearer ', ''))}`;  // Corectarea tokenului, eliminarea dublării

const socket = new WebSocket(wsUrl);

socket.onopen = () => {
  console.log("Conexiune WebSocket stabilită.");
};

socket.onmessage = (event) => {
  console.log("Mesaj de la server:", event.data);
};

socket.onerror = (error) => {
  console.error("Eroare WebSocket:", error);
};

socket.onclose = () => {
  console.log("Conexiune WebSocket închisă.");
};
