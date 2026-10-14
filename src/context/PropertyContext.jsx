'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const PropertyContext = createContext(null);

export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const refresh = () => fetch('/api/properties')
      .then((response) => {
        if (!response.ok) throw new Error('Could not load property listings.');
        return response.json();
      })
      .then((listings) => {
        if (active && Array.isArray(listings)) setProperties(listings);
      })
      .catch((error) => console.error('Could not load approved listings', error))
      .finally(() => { if (active) setLoading(false); });
    refresh();
    if (typeof window !== 'undefined') {
      window.addEventListener('bachelorbari:listings-updated', refresh);
    }
    return () => {
      active = false;
      if (typeof window !== 'undefined') {
        window.removeEventListener('bachelorbari:listings-updated', refresh);
      }
    };
  }, []);

  const addProperty = async (newProp) => {
    const response = await fetch('/api/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProp),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || 'Could not submit this listing.');
    return result;
  };

  const updatePropertyStatus = (id, newStatus) => {
    setProperties((prev) =>
      prev.map((prop) => (prop.id === id ? { ...prop, status: newStatus } : prop))
    );
  };

  const deleteProperty = (id) => {
    return fetch(`/api/properties/${encodeURIComponent(id)}`, { method: 'DELETE' }).then((response) => {
      if (!response.ok) throw new Error('Could not delete this listing.');
      setProperties((prev) => prev.filter((prop) => prop.id !== id));
    });
  };

  const getAvailableProperties = () => {
    return properties.filter((p) => p.status === 'available');
  };

  const getPropertyBySlug = (slug) => {
    return properties.find((p) => p.slug === slug || p.id === slug);
  };

  const stats = {
    total: properties.length,
    available: properties.filter((p) => p.status === 'available').length,
    booked: properties.filter((p) => p.status === 'booked').length,
    rented: properties.filter((p) => p.status === 'rented').length,
  };

  // Helper to count available properties per district
  const getDistrictCount = (districtSlug) => {
    return properties.filter(
      (p) => p.districtSlug === districtSlug && p.status === 'available'
    ).length;
  };

  // Helper to count available properties per area
  const getAreaCount = (areaSlug) => {
    return properties.filter(
      (p) => p.areaSlug === areaSlug && p.status === 'available'
    ).length;
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        loading,
        availableProperties: getAvailableProperties(),
        stats,
        addProperty,
        updatePropertyStatus,
        deleteProperty,
        getPropertyBySlug,
        getDistrictCount,
        getAreaCount,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
}
