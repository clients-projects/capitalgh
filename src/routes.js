import Dashboard from './views/Dashboard'
import UserProfile from './views/UserProfile'
import InvestmentHistory from './views/InvestmentHistory'
import Withdraw from './views/Withdraw'
import WithdrawalHistory from './views/WithdrawalHistory'

//siteOwner routes

import siteOwnerDashboard from './views/siteOwner/Dashboard'
import AccountSettings from './views/siteOwner/AccountSettings'
import DepositHistory from './views/siteOwner/DepositHistory'
import siteOwnerWithdrawalHistory from './views/siteOwner/WithdrawalHistory'
import InvestmentRequest from './views/siteOwner/InvestmentRequest'
import siteOwnerWithdrawalRequest from './views/siteOwner/WithdrawalRequests'
import Members from './views/siteOwner/Members'
import SendEmail from './views/siteOwner/SendEmail'
import DummyWithdrawal from './views/siteOwner/DummyWithdrawal'
import Deposit from './views/Deposit'
import Referrals from './views/Referrals'

export const dashboardRoutes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        icon: 'pe-7s-graph',
        component: Dashboard,
        layout: '/admin',
    },

    {
        path: '/user',
        name: 'Account Profile',
        icon: 'pe-7s-user',
        component: UserProfile,
        layout: '/admin',
    },
    {
        path: '/plansDashboard',
        name: 'Invest',
        icon: 'pe-7s-note2',
        component: Deposit,
        layout: '/admin',
    },
    {
        path: '/withdraw',
        name: 'Withdraw',
        icon: 'pe-7s-news-paper',
        component: Withdraw,
        layout: '/admin',
    },

    {
        path: '/investmentHistory',
        name: 'Investment History',
        icon: 'pe-7s-refresh',
        component: InvestmentHistory,
        layout: '/admin',
    },
    {
        path: '/WithdrawalHistory',
        name: 'Withdrawal History',
        icon: 'pe-7s-refresh',
        component: WithdrawalHistory,
        layout: '/admin',
    },
    {
        path: '/referrals',
        name: 'Referrals',
        icon: 'bx bxs-group',
        component: Referrals,
        layout: '/admin',
    },
]

export const siteOwnerDashboardRoutes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        icon: 'pe-7s-graph',
        component: siteOwnerDashboard,
        layout: '/admin',
    },

    {
        path: '/settings',
        name: 'Account Settings',
        icon: 'pe-7s-user',
        component: AccountSettings,
        layout: '/admin',
    },
    {
        path: '/members',
        name: 'Members',
        icon: 'pe-7s-news-paper',
        component: Members,
        layout: '/admin',
    },
    {
        path: '/dummywithdrawal',
        name: 'Dummy Withdrawal',
        icon: 'bx bx-upload',
        component: DummyWithdrawal,
        layout: '/admin',
    },
    {
        path: '/sendEmail',
        name: 'SendEmail',
        icon: 'bx bx-mail-send',
        component: SendEmail,
        layout: '/admin',
    },
    {
        path: '/withdrawalRequest',
        name: 'Withdrawal Request',
        icon: 'bx bx-upload',
        component: siteOwnerWithdrawalRequest,
        layout: '/admin',
    },
    {
        path: '/InvestmentRequest',
        name: 'Investment Request',
        icon: 'bx bx-download',
        component: InvestmentRequest,
        layout: '/admin',
    },

    {
        path: '/withdrawalHistory',
        name: 'Withdrawal History',
        icon: 'pe-7s-note2',
        component: siteOwnerWithdrawalHistory,
        layout: '/admin',
    },

    {
        path: '/depositHistory',
        name: 'Investment History',
        icon: 'pe-7s-refresh',
        component: DepositHistory,
        layout: '/admin',
    },
]
