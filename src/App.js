import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import './assets/sass/main.scss';
import { Home } from './pages/Home';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Home/>
      </div>
    </QueryClientProvider>
  );
}

export default App;
