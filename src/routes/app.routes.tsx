import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import { Layout } from '../components';

import Dashboard from 'pages/Dashboard';
import ScheduleRegister from 'pages/ScheduleRegister';
import Schedules from 'pages/Schedules';
import Layout from 'components/Layout';

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
