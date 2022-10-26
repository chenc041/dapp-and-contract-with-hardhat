import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from '~/routes';
import { Helmet } from 'react-helmet';
import { GlobalContext } from '~/context';
import { Web3ReactProvider } from '@web3-react/core';
import { ExternalProvider, Web3Provider } from '@ethersproject/providers';
const App = () => {
  const [appName, setAppName] = React.useState('demo');
  function getLibrary(provider: ExternalProvider) {
    return new Web3Provider(provider, 'any');
  }

  return (
    <GlobalContext.Provider value={{ appName, setAppName }}>
      <BrowserRouter>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Routes>
            {routes.map((item) => {
              const { pathname, component: Component } = item;
              console.log('path', pathname);
              return (
                <Route
                  key={pathname}
                  path={pathname}
                  element={
                    <>
                      <Helmet>
                        <title>{item.title}</title>
                      </Helmet>
                      <Component />
                    </>
                  }
                />
              );
            })}
          </Routes>
        </Web3ReactProvider>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};

export default App;
