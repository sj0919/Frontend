import { createBrowserRouter } from 'react-router-dom';
import Layout from './common/layout/MainLayout';
import HeaderOnlyLayout from './common/layout/HeaderOnlyLayout';
import GuestHeaderOnlyLayout from './res/layout/GuestHeaderOnlyLayout';
import StInfo from '@stInfo/page/StInfo';
import StList from './stList/page/StList';
import MainPage from './main/pages/MainPage';
import MyRev from './myrev/pages/MyRev';
import GuestInfoPage from './res/pages/GuestInfoPage';
import MyRes from './myres/pages/MyRes';
import MyRevModal from './myrev/components/myRev02Modal/MyRevModal';
import PaymentPage from './res/pages/PaymentPage';
import ReservationCompletePage from './res/pages/ReservationCompletePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/stinfo', element: <StInfo /> },
      { path: '/myrev', element: <MyRev /> },
      { path: '/stlist', element: <StList /> },
      { path: '/myres', element: <MyRes /> },
    ],
  },
  {
    path: '/main',
    element: <HeaderOnlyLayout />,
    children: [{ path: '', element: <MainPage /> }],
  },

  {
    path: '/guestinfo',
    element: <GuestHeaderOnlyLayout />,
    children: [{ path: '', element: <GuestInfoPage /> }],
  },
  {
    path: '/payment',
    element: <GuestHeaderOnlyLayout />,
    children: [{ path: '', element: <PaymentPage /> }],
  },
  {
    path: '/reservation-complete',
    element: <GuestHeaderOnlyLayout />,
    children: [{ path: '', element: <ReservationCompletePage /> }],
  },
  {
    path: 'modal',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    element: <MyRevModal handleModalClose={() => {}} />,
  },
]);

export default router;
