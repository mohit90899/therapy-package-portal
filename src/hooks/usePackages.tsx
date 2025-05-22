
import { useState, useEffect } from 'react';
import { TherapyPackage } from '../utils/types';
import { dummyPackages } from '../utils/dummyData';
import { useToast } from '@/components/ui/use-toast';

export function usePackages() {
  const [packages, setPackages] = useState<TherapyPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call
    const loadPackages = setTimeout(() => {
      // Convert existing dummy packages to new format with sessionDetails
      const updatedPackages = dummyPackages.map(pkg => ({
        ...pkg,
        sessionDetails: Array(pkg.sessions).fill(null).map(() => ({
          duration: pkg.duration || 60,
        })),
      }));
      
      setPackages(updatedPackages);
      setLoading(false);
    }, 500);

    return () => clearTimeout(loadPackages);
  }, []);

  const createPackage = (newPackage: Omit<TherapyPackage, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
    const packageToAdd: TherapyPackage = {
      ...newPackage,
      id: Math.random().toString(36).substring(2, 9),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setPackages(prev => [...prev, packageToAdd]);
    toast({
      title: "Package Created",
      description: "Your package has been submitted for approval.",
    });
    return packageToAdd;
  };

  const updatePackage = (id: string, updatedData: Partial<TherapyPackage>) => {
    setPackages(prev => 
      prev.map(pkg => 
        pkg.id === id ? { ...pkg, ...updatedData, updatedAt: new Date().toISOString() } : pkg
      )
    );
    toast({
      title: "Package Updated",
      description: "Your package has been updated successfully.",
    });
  };

  const updatePackageStatus = (id: string, status: TherapyPackage['status']) => {
    setPackages(prev => 
      prev.map(pkg => 
        pkg.id === id ? { ...pkg, status, updatedAt: new Date().toISOString() } : pkg
      )
    );
    
    const statusMessage = {
      approved: "The package has been approved and is now available to clients.",
      rejected: "The package has been rejected.",
      pending: "The package has been submitted for approval.",
      draft: "The package has been saved as a draft."
    };
    
    toast({
      title: `Package ${status.charAt(0).toUpperCase() + status.slice(1)}`,
      description: statusMessage[status],
      variant: status === 'rejected' ? "destructive" : "default",
    });
  };

  const deletePackage = (id: string) => {
    setPackages(prev => prev.filter(pkg => pkg.id !== id));
    toast({
      title: "Package Deleted",
      description: "The package has been removed permanently.",
      variant: "destructive"
    });
  };

  const getTherapistPackages = (therapistId: string) => {
    return packages.filter(pkg => pkg.therapistId === therapistId);
  };

  const getApprovedPackages = () => {
    return packages.filter(pkg => pkg.status === 'approved');
  };

  const getPendingPackages = () => {
    return packages.filter(pkg => pkg.status === 'pending');
  };

  return {
    packages,
    loading,
    createPackage,
    updatePackage,
    updatePackageStatus,
    deletePackage,
    getTherapistPackages,
    getApprovedPackages,
    getPendingPackages
  };
}
