import { useEffect, useState, useCallback } from 'react';
import { api } from '@/api';
import { apiPaths } from '@/api/paths';
import { GroupItem, GroupItemResponse } from '@/interfaces/group-list.interface';

export interface UseGroupProps {
  id?: string;
}

export const useGroup = ({ id }: UseGroupProps) => {
  const [group, setGroup] = useState<GroupItem>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getGroup = useCallback(async () => {
    if (!id) {
      return;
    }
    setIsLoading(true);

    const {
      data: { data },
    } = await api.get<GroupItemResponse>(`${apiPaths.groups}/${id}`);

    setGroup(data);
    setIsLoading(false);
  }, [setGroup, id]);

  useEffect(() => {
    getGroup();
  }, [getGroup]);

  return { group, isLoading };
};
