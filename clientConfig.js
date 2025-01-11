
export default function config() {
  const isHttps = window ? (window.location.protocol === "https:") : true;
  const prefixHttp = (isHttps  ? "https" : "http") + "://";
  const prefixWs = (isHttps ? "wss" : "ws") + "://";


  return {
    // "apiUrl": prefixHttp + ((process.env.NEXT_PUBLIC_ENV === "production" &&  process.env.NEXT_PUBLIC_API_URL) ?? "localhost:3001"),
    "apiUrl": prefixHttp + (process.env.NEXT_PUBLIC_ENV === "production" ?  process.env.NEXT_PUBLIC_API_URL:  "localhost:3000"),

    "websocketUrl":prefixWs +  (process.env.NEXT_PUBLIC_ENV === "production" ?  process.env.NEXT_PUBLIC_WS_URL  : "localhost:3002"),
    // "websocketUrl":  process.env.NEXT_PUBLIC_ENV === "production" ? (prefixHttp+ process.env.NEXT_PUBLIC_WS_URL)  : "ws://localhost:3002",

    // the nullish operator `??` is used to check if the left side is null or undefined, if it is, the right side is used
    "cronUrl": prefixHttp + (process.env.NEXT_PUBLIC_CRON_URL ?? "localhost:3003"),

  }
}