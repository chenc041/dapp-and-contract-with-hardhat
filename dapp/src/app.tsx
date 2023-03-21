import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from '~/routes';
import { Helmet } from 'react-helmet';
import { GlobalContext } from '~/context';
const App = () => {
  const [appName, setAppName] = React.useState('demo');

  return (
    <GlobalContext.Provider value={{ appName, setAppName }}>
      <BrowserRouter>
        <Routes>
          {routes.map((item) => {
            const { pathname, component } = item;
            return (
              <Route
                key={pathname}
                path={pathname}
                element={
                  <>
                    <Helmet>
                      <title>{item.title}</title>
                    </Helmet>
                    {component}
                  </>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
    </GlobalContext.Provider>
  );
};

export default App;
