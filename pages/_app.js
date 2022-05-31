import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'antd';
import 'styles/globals.scss'
import 'styles/common.scss'
import styles from 'styles/app.module.scss'
import { getCookie, setCookie } from 'utils/cookies';
import { Breadcrumbs } from 'components';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTER_PATH } from 'constants/routerPath';
import config from 'package.json';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
  const { name, version } = config || {};
  const [userName, setUserName] = useState('');
  const router = useRouter()
  const { pathname } = router;
  const isLogin = pathname.includes('login')

  useEffect(() => {
    const userNameCookie = getCookie('userName');
    if (!userNameCookie) {
      router.push(ROUTER_PATH.LOGIN)
    } else {
      setUserName(userNameCookie)
    }
  }, []);

  if (!userName && !isLogin) {
    return (
      <center className='loading-label'>loading...</center>
    );
  }

  const handleLogout = () => {
    setCookie('userName', '')
    router.push(ROUTER_PATH.LOGIN)
  }

  const handleSignUp = () => {
    alert('The feature is under development')
  }

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.left}>
          <Link href={ROUTER_PATH.HOME}>
            <span className={styles.logo}>NextJS</span>
          </Link>
        </div>
        <div className={styles.right}>
          {!isLogin && (
            <>
              <Image src="/user.png" alt="User Logo" width={24} height={24} />
              <span className={styles.user}>{userName}</span>
              <Button size='small' shape="round" onClick={handleLogout}>Logout</Button>
            </>
          )}

          {isLogin && <Button size='small' shape="round" onClick={handleSignUp}>Sign up</Button>}
        </div>
      </div>
      <div style={{ visibility: isLogin ? 'hidden' : '' }}>
        <Breadcrumbs pathname={pathname} />
      </div>

      <div className={styles.body}>
        <Component {...pageProps} />
      </div>

      <footer className={styles.footer}>
        <a rel="noopener noreferrer">
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
        <span className={styles.version}>{`${name}`.toUpperCase() + ` / v${version}`}</span>
      </footer>
    </div>
  )
}

export default MyApp

