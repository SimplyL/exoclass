import { useCallback, useEffect, useState } from 'react';
import { api } from '@/api';
import { apiPaths } from '@/api/paths';
import { GroupItem, GroupListResponse } from '@/interfaces/group-list.interface';

export const useGroups = () => {
  const [groups, setGroups] = useState<GroupItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getGroups = useCallback(async () => {
    setIsLoading(true);
    const {
      data: { data },
    } = await api.get<GroupListResponse>(apiPaths.groups, {
      params: {
        provider_key: '7792d545-2bc6-4ee6-b96e-51bdf1d0d855',
        group_status: 'published',
      },
    });

    setGroups(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  return { groups, isLoading };
};
