import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Cliente } from './components/Cliente';
import { Admin } from './components/admin/Admin';
import { ToastProvider } from './ui/Toast';

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Cliente />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}
