import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { getCookie, setCookie } from 'utils/cookies';
import { Breadcrumbs } from 'components';
import { ROUTER_PATH } from 'constants/routerPath';
import 'antd/dist/antd.css';
import 'styles/globals.scss';
import 'styles/common.scss';
import styles from 'styles/app.module.scss';
import config from 'package.json';

const { Header, Content, Footer, Sider } = Layout;

function getItem(key, label, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(ROUTER_PATH.HOME, 'Home', <DesktopOutlined />, null),
  getItem('posts', 'Posts', <UserOutlined />, [
    getItem(ROUTER_PATH.POST, 'Post', null, null),
    getItem('root_post', 'Root Posts', null, [
      getItem(ROUTER_PATH.POSTS, 'Posts', null, null),
      getItem(ROUTER_PATH.ADD_POST, 'Add post', null, null),
    ]),
  ]),
];

const rootSubmenuKeys = ['posts'];
const initOpenKeys = {
  [ROUTER_PATH.POST]: ['posts'],
  [ROUTER_PATH.POSTS]: ['posts', 'root_post'],
  [ROUTER_PATH.ADD_POST]: ['posts', 'root_post'],
}

const rightItems = [
  {
    key: 'user',
    label: 'Admin',
    icon: <UserOutlined />,
    children: [
      {
        key: 'logout',
        label: 'Logout',
        icon: <LogoutOutlined />
      }
    ],
  }
];

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const { pathname } = router;
  const [isSSR, setIsSSR] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState(initOpenKeys[pathname] || [ROUTER_PATH.HOME]);

  // const [userName, setUserName] = useState('');
  // useEffect(() => {
  //   const userNameCookie = getCookie('userName');
  //   if (!userNameCookie) {
  //     router.push(ROUTER_PATH.LOGIN)
  //   } else {
  //     setUserName(userNameCookie)
  //   }
  // }, []);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  const handleLogout = () => {
    setCookie('userName', '')
    router.push(ROUTER_PATH.LOGIN);
  }

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return !isSSR && (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        className={styles.sider}
        collapsible collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Link href={ROUTER_PATH.HOME}>
          <span className={styles.logo}>NextJS</span>
        </Link>

        <Menu
          theme="dark"
          mode="inline"
          items={items}
          openKeys={openKeys}
          defaultSelectedKeys={[pathname]}
          onSelect={({ key }) => {
            router.push(key)
          }}
          onOpenChange={onOpenChange}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          <Menu
            theme="light"
            mode="horizontal"
            className={styles.rightMenu}
            items={rightItems}
            onClick={({ key }) => {
              if (key === 'logout') {
                handleLogout();
              }
            }}
          />
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumbs pathname={pathname} />
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Component {...pageProps} />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          {`${config?.name}`.toUpperCase()} ©2022 Created by Bon {`v${config?.version}`}
        </Footer>
      </Layout>
    </Layout>
  )
}

export default MyApp

