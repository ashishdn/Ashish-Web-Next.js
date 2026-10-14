'use client';
import React, { createContext, useContext, useMemo } from 'react';
import { useRouter as useNextRouter, usePathname, useSearchParams } from 'next/navigation';
import NextLink from 'next/link';

const RouterContext = createContext(null);

export function RouterProvider({ children }) {
  const nextRouter = useNextRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryParams = useMemo(() => {
    const params = {};
    if (searchParams) {
      for (const [key, value] of searchParams.entries()) {
        params[key] = value;
      }
    }
    return params;
  }, [searchParams]);

  const queryString = searchParams ? searchParams.toString() : '';

  const navigate = (to, params = {}) => {
    let url = to;
    const queryEntries = Object.entries(params).filter(
      ([, val]) => val !== undefined && val !== null && val !== ''
    );
    if (queryEntries.length > 0) {
      const search = new URLSearchParams(queryEntries).toString();
      url += (url.includes('?') ? '&' : '?') + search;
    }
    nextRouter.push(url);
  };

  return (
    <RouterContext.Provider
      value={{
        currentPath: pathname || '/',
        queryString: queryString ? `?${queryString}` : '',
        queryParams,
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
  let href = to || '/';
  if (params) {
    const queryEntries = Object.entries(params).filter(
      ([, val]) => val !== undefined && val !== null && val !== ''
    );
    if (queryEntries.length > 0) {
      const search = new URLSearchParams(queryEntries).toString();
      href += (href.includes('?') ? '&' : '?') + search;
    }
  }

  return (
    <NextLink href={href} onClick={onClick} className={className} {...props}>
      {children}
    </NextLink>
  );
}
