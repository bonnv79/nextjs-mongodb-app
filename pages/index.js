import clientPromise from 'lib/mongodb';
import Head from 'next/head'
import styles from 'styles/Home.module.scss'

export default function Home({ isConnected }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>NextJS Mongodb App</title>
        <meta name="description" content="Generated by NextJS Mongodb App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        {isConnected ? (
          <h2 className={styles.subtitle}>You are connected to MongoDB</h2>
        ) : (
          <h2 className={styles.subtitle}>
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )}
      </main>
    </div>
  )
}


export async function getServerSideProps(context) {
  try {
    await clientPromise;
    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}