export function getApiBase(): string {
  const fixedIP = "192.168.15.6"; // Coloque aqui seu IPv4
  return `http://${fixedIP}:3333`;
}
