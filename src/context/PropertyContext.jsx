import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProperties } from '../data/properties.js';

const PropertyContext = createContext(null);

const STORAGE_KEY = 'bachelorbari_properties';

export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load properties from localStorage', e);
    }
    return initialProperties;
  });

  // Save to localStorage whenever properties change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
    } catch (e) {
      console.error('Failed to save properties to localStorage', e);
    }
  }, [properties]);

  const addProperty = (newProp) => {
    const formatted = {
      ...newProp,
      id: newProp.id || `prop-user-${Date.now()}`,
      status: newProp.status || 'available',
      createdAt: new Date().toISOString(),
    };
    setProperties((prev) => [formatted, ...prev]);
    return formatted;
  };

  const updatePropertyStatus = (id, newStatus) => {
    setProperties((prev) =>
      prev.map((prop) => (prop.id === id ? { ...prop, status: newStatus } : prop))
    );
  };

  const deleteProperty = (id) => {
    setProperties((prev) => prev.filter((prop) => prop.id !== id));
  };

  const resetToDefaultData = () => {
    setProperties(initialProperties);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProperties));
    } catch (e) {
      console.error(e);
    }
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
        availableProperties: getAvailableProperties(),
        stats,
        addProperty,
        updatePropertyStatus,
        deleteProperty,
        resetToDefaultData,
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
