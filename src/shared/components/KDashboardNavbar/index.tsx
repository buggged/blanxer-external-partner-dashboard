import { KUserButton } from '@components/KUserButton';
import { AppShell, Badge, Box, Group, ScrollArea, Text } from '@mantine/core';
import { NavLink } from 'react-router-dom';
import style from './style.module.scss';
import {
  BadgeIndianRupee,
  BugIcon,
  ChartSpline,
  CirclePercent,
  CopyrightIcon,
  GiftIcon,
  HouseIcon,
  Image,
  LayersIcon,
  LayoutGridIcon,
  MagnetIcon,
  MessageCircleMore,
  Settings,
  ShoppingBasketIcon,
  StarIcon,
  UserCheck,
  UsersIcon,
} from 'lucide-react';
import {
  IconFlame,
  IconHanger,
  IconPlugConnected,
  IconSettingsDollar,
} from '@tabler/icons-react';

const showNavItem = (
  navItem: (typeof customizationLinks)[0],
  current_store: any,
) => {
  if (
    !!navItem.filter &&
    !!current_store &&
    !(current_store as any)[navItem.filter]
  ) {
    return false;
  }

  return true;
};

const KNavLink = ({ label, goto, image, icon, badge, onClose }: any) => {
  return (
    <NavLink
      onClick={() => onClose?.()}
      to={goto}
      end
      className={({ isActive }) =>
        `${style.navLink} ${isActive ? style.navLinkActive : ''}`
      }>
      <Group justify='space-between'>
        <Group align='center'>
          {icon ? icon : <img style={{ width: 16 }} src={image} alt='' />}
          <Text className={style.navLabel}>{label}</Text>
        </Group>
        {!!badge && (
          <Badge color='red' size='xs'>
            {badge}
          </Badge>
        )}
      </Group>
    </NavLink>
  );
};

export default function KDashboardNavbar({ onClose, onSwitchStore }: any) {
  // const { current_store } = useStores();

  return (
    <AppShell.Navbar>
      {/* Navbar Header | Switch Store button */}
      <AppShell.Section
        style={{ borderBottom: '1px solid var(--app-shell-border-color)' }}>
        <KUserButton name={''} role={''} onClick={onSwitchStore} />
      </AppShell.Section>

      {/* Navbar Navigation Links */}
      <AppShell.Section grow component={ScrollArea}>
        <Box className={style.collectionHeader}>
          <Text size='xs' fw={500} c='dimmed'>
            Main Links
          </Text>
        </Box>
        <div className={style.collections}>
          {mainLinks.map((el: any) => {
            return <KNavLink key={el.label} {...el} onClose={onClose} />;
          })}
        </div>

        <Box className={style.collectionHeader}>
          <Text size='xs' fw={500} c='dimmed'>
            Customizations
          </Text>
        </Box>
        <div className={style.collections}>
          {customizationLinks.map((el) => {
            return <KNavLink key={el.label} {...el} onClose={onClose} />;
          })}
        </div>
      </AppShell.Section>
    </AppShell.Navbar>
  );
}

export function KDashboardNavbarDrawer({ onClose, onSwitchStore }: any) {
  // const { current_store } = useStores();

  return (
    <Box>
      <Box
        style={{
          borderBottom: '1px solid var(--app-shell-border-color)',
          '--btn-bg-color': '#fbfaff',
          '--btn-bg-color-dark': '#1f1f1f',
        }}>
        <KUserButton name={'abc'} role={'abc'} onClick={onSwitchStore} />
      </Box>

      {/* Navbar Navigation Links */}
      <Box component={ScrollArea}>
        <Box className={style.collectionHeader}>
          <Text size='xs' fw={500} c='dimmed'>
            Main Links
          </Text>
        </Box>
        <div className={style.collections}>
          {mainLinks.map((el: any) => {
            return <KNavLink key={el.label} {...el} onClose={onClose} />;
          })}
        </div>

        <Box className={style.collectionHeader}>
          <Text size='xs' fw={500} c='dimmed'>
            Customizations
          </Text>
        </Box>
        <div className={style.collections}>
          {customizationLinks.map((el) => {
            return <KNavLink key={el.label} {...el} onClose={onClose} />;
          })}
        </div>
      </Box>
    </Box>
  );
}

const customizationLinks = [
  {
    icon: <LayersIcon size={16} strokeWidth={2} />,
    label: 'Pages',
    image: '/svg/appearance.svg',
    goto: '/dashboard/pages',
    show: ['owner', 'manager'],
    filter: 'plan',
  },
  {
    icon: <IconPlugConnected size={16} strokeWidth={2} />,
    label: 'Plugins',
    image: '/svg/plug.svg',
    goto: '/dashboard/plugins',
    show: ['owner', 'manager'],
    // badge: '+3 NEW',
  },
  {
    icon: <IconHanger size={16} strokeWidth={2} />,
    label: 'Appearance',
    image: '/svg/appearance.svg',
    goto: '/dashboard/appearance',
    show: ['owner', 'manager'],
  },
  {
    icon: <Settings size={16} strokeWidth={2} />,
    label: 'Store Setting',
    image: '/svg/setting.svg',
    goto: '/dashboard/store_setting',
    show: ['owner', 'manager'],
  },
  {
    icon: <IconSettingsDollar size={16} strokeWidth={2} />,
    label: 'Payment Setting',
    image: '/svg/pg.svg',
    goto: '/dashboard/payment_setting',
    show: ['owner', 'manager'],
  },
];

const mainLinks = [
  {
    icon: <HouseIcon size={16} strokeWidth={2} />,
    image: '/svg/home.svg',
    label: 'Home',
    goto: '/dashboard',
    show: true,
  },
  {
    icon: <UsersIcon size={16} strokeWidth={2} />,
    image: '/svg/users.svg',
    label: 'Store Users',
    goto: '/dashboard/users',
    show: true,
  },
  {
    icon: <LayoutGridIcon size={16} strokeWidth={2} />,
    image: '/svg/categories.svg',
    label: 'Categories',
    goto: '/dashboard/categories',
    show: ['owner', 'manager'],
  },
  {
    icon: <CopyrightIcon size={16} strokeWidth={2} />,
    label: 'Brands',
    goto: '/dashboard/brands',
    show: ['owner', 'manager'],
  },
  {
    icon: <GiftIcon size={16} strokeWidth={2} />,
    image: '/svg/products.svg',
    label: 'Products',
    goto: '/dashboard/products',
    show: ['owner', 'manager'],
  },
  {
    icon: <StarIcon size={16} strokeWidth={2} />,
    image: '/svg/products.svg',
    label: 'Reviews',
    goto: '/dashboard/reviews',
    show: ['owner', 'manager'],
    // badge: 'NEW',
  },
  {
    icon: <UserCheck size={16} strokeWidth={2} />,
    image: '/svg/users.svg',
    label: 'Customers',
    goto: '/dashboard/customers',
    show: true,
  },
  {
    icon: <ShoppingBasketIcon size={16} strokeWidth={2} />,
    image: '/svg/cart.svg',
    label: 'Orders',
    goto: '/dashboard/orders',
    show: true,
  },
  {
    icon: <MagnetIcon size={16} strokeWidth={2} />,
    image: '/svg/lead.svg',
    label: 'Leads',
    goto: '/dashboard/leads',
    show: true,
    filter: 'showPayment',
  },
  {
    icon: <BugIcon size={16} strokeWidth={2} />,
    image: '/svg/issues.svg',
    label: 'Issues',
    goto: '/dashboard/issues',
    show: true,
  },
  {
    icon: <MessageCircleMore size={16} strokeWidth={2} />,
    image: '/svg/sms.svg',
    label: 'Blanxer SMS',
    goto: '/dashboard/sms',
    show: true,
  },
  // {
  //   image: '/svg/offer.svg',
  //   label: 'Offers',
  //   goto: '/dashboard/offers',
  //   show: true,
  //   badge: 'BETA',
  // },
  {
    icon: <CirclePercent size={16} strokeWidth={2} />,
    image: '/svg/discount.svg',
    label: 'Discount Coupons',
    goto: '/dashboard/coupons',
    show: true,
    filter: 'plan',
  },
  {
    icon: <ChartSpline size={16} strokeWidth={2} />,
    image: '/svg/stats.svg',
    label: 'Analytics',
    goto: '/dashboard/analytics',
    show: ['owner', 'manager'],
  },
  {
    icon: <Image size={16} strokeWidth={2} />,
    image: '/svg/media.svg',
    label: 'Media',
    goto: '/dashboard/media',
    show: ['owner', 'manager'],
    filter: 'plan',
  },
  {
    icon: <BadgeIndianRupee size={16} strokeWidth={2} />,
    image: '/svg/bill.svg',
    label: 'Transactions',
    goto: '/dashboard/transactions',
    show: ['owner', 'manager'],
    filter: 'showPayment',
  },
];
