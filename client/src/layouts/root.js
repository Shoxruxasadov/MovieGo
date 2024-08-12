import Animated from '@/components/others/animated'
import Head from 'next/head'

export default function Root({ children, page, title }) {
    return (
        <>
            <Head>
                {title ? <title>{title} • MovieGo</title> : <title>MovieGo</title>}
                <link href="/favicon.ico?" rel="icon" />
                <link href="/favicon.png?" rel="apple-touch-icon" />
                <link href="/manifest.json" rel="manifest" />
                <meta name="theme-color" content="#0D0D0D" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="MovieGo • Free Movies Streaming Service" />
                <meta name="keywords" content="MovieGo, Marvel" />
            </Head>
            <div id={page}>
                {children}
            </div>
        </>
    )
}