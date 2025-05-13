import SalesTrends from './pages/SalesTrends';

function App() {
  return (
    <Routes>
      {/* Other routes */}
      <Route path="/sales-trends" element={<SalesTrends />} />
    </Routes>
  );
}