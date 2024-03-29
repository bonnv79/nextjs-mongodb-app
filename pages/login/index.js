import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button, Input } from 'antd'
import { ComponentLabel, Backdrop, ErrorMsg } from 'components'
import { ROUTER_PATH } from 'constants/routerPath'
import { getCookie, setCookie } from 'utils/cookies'
import { API_LOGIN } from 'constants/apiPath'
import styles from './styles.module.scss'
import { sleep } from 'utils'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [account, setAccount] = useState('admin')
  const [password, setPassword] = useState('admin')
  const [errorMsg, setErrorMsg] = useState('')
  const router = useRouter()

  useEffect(() => {
    const userNameCookie = getCookie('userName');
    if (userNameCookie) {
      router.push(ROUTER_PATH.HOME)
    }
  }, []);

  const handleLogin = () => {
    setLoading(true);
    setErrorMsg('');

    const requestBody = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        account,
        password
      })
    };

    fetch(API_LOGIN, requestBody)
      .then(response => response.json())
      .then(async res => {
        await sleep(500)
        setLoading(false);

        const { name, error } = res;
        if (name && !error) {
          setCookie('userName', name);
          router.reload();
        } else {
          setErrorMsg(error)
        }
      });
  }

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      handleLogin();
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <center>
          <h1>Sign in</h1>

          <div style={{ width: 300 }}>
            <ComponentLabel label="User Name">
              <Input
                value={account}
                onChange={e => setAccount(e.target.value)}
                placeholder="admin"
                onKeyDown={handleEnter}
              />
            </ComponentLabel>

            <ComponentLabel label="Password">
              <Input
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="admin"
                onKeyDown={handleEnter}
              />
            </ComponentLabel>
          </div>

          <div>
            <Button size='small' shape="round" onClick={handleLogin}>Sign in</Button>
          </div>

          <ErrorMsg>{errorMsg}</ErrorMsg>
        </center>
      </div>
      <Backdrop open={loading} />
    </div>
  )
}