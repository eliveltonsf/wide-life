import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from 'components/Layout';
import Dashboard from 'pages/Dashboard';
import ScheduleRegister from 'pages/ScheduleRegister';
import Schedules from 'pages/Schedules';

const AppRoutes: React.FC = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/schedules" element={<Schedules />} />
      <Route path="/register-schedule" element={<ScheduleRegister />} />
    </Routes>
  </Layout>
);

export default AppRoutes;
