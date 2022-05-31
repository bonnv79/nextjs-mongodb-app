import styles from './styles.module.scss';
import { PARSE_ROUTER_PATH_BREADCRUMBS, ROUTER_PATH } from 'constants/routerPath';
import Link from 'next/link';
import { Breadcrumb } from 'antd';

export function Breadcrumbs({ pathname }) {
  const arr = pathname.split('/');
  const data = [{
    id: 'id-home',
    href: ROUTER_PATH.HOME,
    name: 'Home'
  }];

  arr.forEach((item, index) => {
    if (item) {
      data.push({
        id: `id-${index}`,
        href: PARSE_ROUTER_PATH_BREADCRUMBS[item] || `/${item}`,
        name: `${item}`.replace('-', ' ')
      })
    }
  });

  const size = data.length;

  return (
    <Breadcrumb className={styles.breadcrumb}>
      {
        data.map((item, index) => {
          const isLast = index === size - 1;
          return (
            <Breadcrumb.Item key={item.id} className={styles.item}>
              <Link href={item.href}>
                {isLast ? item.name : <a>{item.name}</a>}
              </Link>
            </Breadcrumb.Item>
          )
        })
      }
    </Breadcrumb>
  )
}

export default Breadcrumbs;