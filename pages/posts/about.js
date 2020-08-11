import Head from 'next/head'
import Link from 'next/link'
import Layout from '../../components/layout'

export default function About() {
    return (
        <Layout>
            <Head>
                <title>First Post</title>
            </Head>
            <div className="appLayout">
                <section className="section is-medium">
                    <div className="container content">
                        <h1 className="title">About</h1>
                        <p >Esse ut id in voluptate. Non occaecat fugiat do nostrud consectetur tempor aliqua ea magna. Pariatur nulla est adipisicing eiusmod adipisicing dolore ea nisi cillum commodo ad ipsum sunt. Cillum ullamco duis cillum minim fugiat sint proident adipisicing ea esse pariatur proident. Anim laboris exercitation nulla sit est quis in aliqua duis commodo ut. Mollit anim enim mollit veniam nisi. Enim culpa est ex dolore adipisicing non amet.</p>
                    </div>
                </section>
                <footer className="footer">
                    <div className="content has-text-centered">
                        <p>
                            <strong>Aeria</strong> by <a href="#">FutureModern</a>. The source code is licensed
                            <a href="#">MIT</a>. The website content
                            is licensed <a href="#">CC BY NC SA 4.0</a>.
                        </p>
                    </div>
                </footer>
            </div>
        </Layout>
    )
}