import React, { createContext, useContext, useState, useEffect } from 'react';

const RouterContext = createContext(null);

export function RouterProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname || '/');
  const [queryString, setQueryString] = useState(() => window.location.search || '');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      setQueryString(window.location.search || '');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to, params = {}) => {
    let url = to;
    const queryEntries = Object.entries(params).filter(
      ([, val]) => val !== undefined && val !== null && val !== ''
    );
    if (queryEntries.length > 0) {
      const search = new URLSearchParams(queryEntries).toString();
      url += (url.includes('?') ? '&' : '?') + search;
    }

    if (window.location.pathname + window.location.search !== url) {
      window.history.pushState({}, '', url);
      const [path, search] = url.split('?');
      setCurrentPath(path || '/');
      setQueryString(search ? `?${search}` : '');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getQueryParams = () => {
    const search = new URLSearchParams(queryString);
    const params = {};
    for (const [key, value] of search.entries()) {
      params[key] = value;
    }
    return params;
  };

  return (
    <RouterContext.Provider
      value={{
        currentPath,
        queryString,
        queryParams: getQueryParams(),
        navigate,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

export function Link({ to, params, className, children, onClick, ...props }) {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    navigate(to, params);
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
