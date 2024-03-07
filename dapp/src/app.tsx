import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { routes } from '~/routes';
import { Helmet } from 'react-helmet';
import { GlobalContext } from '~/context';
import { BasicLayout } from '~/layout/basicLayout';
import '~/global.scss';
import { wagmiConfig } from '~/wagmi.config';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <BasicLayout />,
    children: routes.map(({ path, title, component, description, keywords }) => {
      return {
        path: path,
        element: (
          <>
            <Helmet>
              <title>{title}</title>
              <meta name="description" content={description} />
              <meta name="keywords" content={keywords} />
            </Helmet>
            {component}
          </>
        ),
      };
    }),
  },
]);

const App = () => {
  const [appName, setAppName] = React.useState('demo');
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <GlobalContext.Provider value={{ appName, setAppName }}>
          <RouterProvider router={router} />
        </GlobalContext.Provider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default App;
