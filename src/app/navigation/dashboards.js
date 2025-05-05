import { HomeIcon } from '@heroicons/react/24/outline';
import WindowIcon from 'assets/nav-icons/window.svg?react'
import DashboardsIcon from 'assets/dualicons/dashboards.svg?react'
import { NAV_TYPE_ROOT, NAV_TYPE_ITEM } from 'constants/app.constant'

const ROOT_DASHBOARDS = '/dashboards'

const path = (root, item) => `${root}${item}`;

export const dashboards = {
    id: 'dashboards',
    type: NAV_TYPE_ROOT,
    path: '/dashboards',
    title: 'Dashboards',
    transKey: 'nav.dashboards.dashboards',
    Icon: DashboardsIcon,
    childs: [
        {
            id: 'dashboards.home',
            path: path(ROOT_DASHBOARDS, '/leads'),
            type: NAV_TYPE_ITEM,
            title: 'Home',
            transKey: '',
            Icon: HomeIcon,
        },
        {
            id: 'dashboards.addlead',
            path: path(ROOT_DASHBOARDS, '/addlead'),
            type: NAV_TYPE_ITEM,
            title: 'Add Lead',
            transKey: '',
            Icon: WindowIcon,
        },
        {
            id: 'dashboards.leads',
            path: path(ROOT_DASHBOARDS, '/lead'),
            type: NAV_TYPE_ITEM,
            title: 'Lead',
            transKey: '',
            Icon: WindowIcon,
        },

    ]
}
