import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en" className=" bg-slate-900">
            <Head>
                <title>What the fuck to watch</title>
                <meta name="description" content="Find a movie to watch" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <body className="h-fit w-full">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}