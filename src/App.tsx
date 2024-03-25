import { Route, Routes } from 'react-router-dom';
import GroupList from '@/modules/group-list';
import Group from '@/modules/group';
import Payments from '@/modules/Payments';
import Layout from '@/components/layout';
import { routes } from '@/defaults/routes.default';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path={routes.home} element={<GroupList />} />
        <Route path={routes.group} element={<Group />} />
        <Route path={routes.payment} element={<Payments />} />
      </Routes>
    </Layout>
  );
}

export default App;
