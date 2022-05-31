import styles from './styles.module.scss';
import { PARSE_ROUTER_PATH_BREADCRUMBS, ROUTER_PATH } from 'constants/routerPath';
import Link from 'next/link';

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
    <ul className={styles.breadcrumb}>
      {
        data.map((item, index) => {
          const isLast = index === size - 1;
          return (
            <li key={item.id}>
              {
                isLast ? (
                  <span>{item.name}</span>
                ) : (
                  <Link href={item.href}>
                    <a>{item.name}</a>
                  </Link>
                )
              }

            </li>
          )
        })
      }
    </ul>
  )
}

export default Breadcrumbs