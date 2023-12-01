import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import routes from './router/router';
import { useAuthToken } from './store/authStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ToasterContext from './libs/ToasterContext';
import { webSocketInstance } from './services/websocketInstance';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter(routes);

const App = () => {
  const token = useAuthToken();

  useEffect(() => {
    if (!token) return;

    if (token) {
      webSocketInstance.setToken(token);
      webSocketInstance.connect();
    } else {
      webSocketInstance.disconnect();
    }
    return () => {
      webSocketInstance.disconnect();
    };
  }, [token]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToasterContext />
    </QueryClientProvider>
  );
};

export default App;
