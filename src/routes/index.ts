import { MenuList } from '@/interfaces/layout/menu.interface';
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
        code: 'userTenant',
        icon: UserOutlined,
        label: 'User',
        path: '/tenant/user',
      },
    ]
  }
]

export default routes;