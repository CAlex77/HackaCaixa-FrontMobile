import os from "os";

function getLocalIp() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address; // ex.: 192.168.15.6
      }
    }
  }
  return "localhost";
}

export default {
  expo: {
    extra: {
      apiUrl: `http://${getLocalIp()}:3333`,
    },
  },
};
