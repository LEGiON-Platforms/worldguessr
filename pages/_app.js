import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react"
import { GoogleAnalytics } from "nextjs-google-analytics";
import { useEffect } from "react";
export default function App({ Component, pageProps }) {
  useEffect(() => {
    console.log("App mounted");
  });
  return (
    <>
      <Analytics />
      <GoogleAnalytics trackPageViews gaMeasurementId="G-KFK0S0RXG5" />
      <Component {...pageProps} />
    </>
  );
}
