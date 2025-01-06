
export default function config() {
  const isHttps = window ? (window.location.protocol === "https:") : true;
  const prefixHttp = (isHttps ? "https" : "http") + "://";
  const prefixWs = (isHttps ? "wss" : "ws") + "://";


  return {
    // apiUrl is localhost:3001 
    "apiUrl": prefixHttp + ((process.env.NEXT_PUBLIC_ENV === "production" &&  process.env.NEXT_PUBLIC_API_URL) ?? "localhost:3001"),
    "websocketUrl": prefixWs + ((process.env.NEXT_PUBLIC_ENV === "production" &&  process.env.NEXT_PUBLIC_WS_URL) ?? process.env.NEXT_PUBLIC_API_URL ?? "localhost:3002") + '/wg',
    "cronUrl": prefixHttp + (process.env.NEXT_PUBLIC_CRON_URL ?? "localhost:3003"),

  }
}