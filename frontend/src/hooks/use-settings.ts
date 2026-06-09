import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsService } from '../services/settings.service';
import { ClinicSettingsUpdate } from '../types/settings.types';

export const useSettings = () => {
  const queryClient = useQueryClient();

  const settingsQuery = useQuery({
    queryKey: ['settings'],
    queryFn: settingsService.getSettings,
  });

  const updateSettingsMutation = useMutation({
    mutationFn: (data: ClinicSettingsUpdate) => settingsService.updateSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      alert('Clinic settings updated successfully');
    },
    onError: (error: any) => {
      alert(error.response?.data?.detail || 'Failed to update settings');
    },
  });

  const uploadLogoMutation = useMutation({
    mutationFn: (file: File) => settingsService.uploadLogo(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      alert('Logo uploaded successfully');
    },
    onError: (error: any) => {
      alert(error.response?.data?.detail || 'Failed to upload logo');
    },
  });

  return {
    settings: settingsQuery.data,
    isLoading: settingsQuery.isLoading,
    updateSettings: updateSettingsMutation.mutate,
    isUpdating: updateSettingsMutation.isPending,
    uploadLogo: uploadLogoMutation.mutate,
    isUploading: uploadLogoMutation.isPending,
  };
};
