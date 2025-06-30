import { Route, Routes } from 'react-router-dom';
import Layout from "./components/layout/Layout.jsx";
import PrivateRoute from './components/privateRoute/PrivateRoute.jsx';
import NotFoundPage from './pages/customer/notFound/NotFound.jsx';
import ExamplesAdminPage from './pages/admin/example/Example.jsx';
import CategoriesAdminPage from './pages/admin/category/Category.jsx';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }>
          <Route path="/" element={<h1>Home Page</h1>} />
        </Route>

        {/* Admin route */}
        <Route path="/admin/examples" element={<ExamplesAdminPage />} />
        <Route path="/admin/categories" element={<CategoriesAdminPage />} />

        {/* Public route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
