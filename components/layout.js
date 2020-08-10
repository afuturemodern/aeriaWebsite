import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'Nate'
export const siteTitle = 'Next.js Sample Website'

export default function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.now.sh/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
                <link
                    rel="stylesheet"
                    src="https://cdn.jsdelivr.net/npm/uikit@3.5.5/dist/js/uikit.min.js"
                />
                <script
                    defer
                    src="https://cdn.jsdelivr.net/npm/uikit@3.5.5/dist/js/uikit.min.js"
                />
                <script
                    defer
                    src="https://cdn.jsdelivr.net/npm/uikit@3.5.5/dist/js/uikit-icons.min.js"
                />
            </Head>
            <header className={styles.header}>
                {home ? (
                    <>
                        <nav className="navbar" role="navigation" aria-label="main navigation">
                            <div className="navbar-brand">
                                <a className="navbar-item" href="/">
                                    Aeria
                                </a>
                            </div>
                            <div id="navbarBasicExample" className="navbar-menu">
                                <div className="navbar-start">
                                    <a className="navbar-item">
                                        Description
                                    </a>
                                </div>
                                <div className="navbar-end">
                                    <div className="navbar-item">
                                        <div className="buttons">
                                            <Link href="./posts/about">
                                                <a className="button is-light">
                                                    ?
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        <p className="content" id="navDescription">a FutureModern app</p>
                    </>
                ) : (
                        <>
                            <nav className="navbar" role="navigation" aria-label="main navigation">
                                <div className="navbar-brand"><strong>

                                </strong>
                                    <Link href="/">
                                        <a className="navbar-item" >
                                            Aeria
                                </a>
                                    </Link>
                                </div>
                                <div id="navbarBasicExample" className="navbar-menu">
                                    <div className="navbar-start">
                                        <a className="navbar-item">
                                            Description
                                    </a>
                                    </div>
                                    <div className="navbar-end">
                                        <div className="navbar-item">
                                            <div className="buttons">
                                                <a className="button is-light">
                                                    ?
                                            </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                            <p className="content" id="navDescription">a FutureModern app</p>
                        </>
                    )}
            </header>
            {/* {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
            )} */}
            <main>{children}</main>
        </div>
    )
}