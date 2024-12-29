import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head >
      <Script src="https://cdn.lordicon.com/lordicon.js" strategy="beforeInteractive" />
      </Head>
      <body className="mainBody">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
