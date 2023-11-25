import { MenuList } from '@/interfaces/menu.interface';
import { DashboardOutlined, UserOutlined, ApartmentOutlined } from '@ant-design/icons';

const routes: MenuList = [
  {
    code: 'dashboard',
    icon: DashboardOutlined,
    label: 'Dashboard',
    path: '/dashboard'
  },
  {
    code: 'tenant',
    icon: ApartmentOutlined,
    label: 'Tenant Management',
    path: '/tenant',
    children: [
      {
        code: 'oauthClient',
        icon: UserOutlined,
        label: 'OAuth Client',
        path: '/tenant/client',
      },
    ]
  }
]

export default routes;