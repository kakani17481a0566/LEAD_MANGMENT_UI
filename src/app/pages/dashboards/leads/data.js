import { ArrowPathIcon, CheckBadgeIcon, ClockIcon, TruckIcon, XCircleIcon } from "@heroicons/react/24/outline";

export const orderStatusOptions = [
    {
        value: 'Open',
        label: 'Open',
        color: 'info',
        icon: TruckIcon
    },
    {
        value: 'pending',
        label: 'Pending',
        color: 'warning',
        icon: ClockIcon
    },
    {
        value: 'Closed',
        label: 'Closed',
        color: 'success',
        icon: CheckBadgeIcon
    },
    {
        value: 'InProcess',
        label: 'InProcess',
        color: 'primary',
        icon: ArrowPathIcon
    },
    {
        value: 'Visiting Soon',
        label: 'Visiting Soon',
        color: 'primary',
        icon: ArrowPathIcon
    },
    {
        value: 'School Visited',
        label: 'School Visited',
        color: 'primary',
        icon: ArrowPathIcon
    },
    {
        value: 'Not Interested',
        label: 'Not Interested',
        color: 'error',
        icon: XCircleIcon
    }
]

export const ordersList = [
  ];
