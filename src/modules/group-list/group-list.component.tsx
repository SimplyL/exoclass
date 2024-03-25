import { useNavigate } from 'react-router-dom';
import GroupCard from '@/modules/group-list/components/group-card';
import { useGroups } from './hooks/use-groups.hook';
import { routes } from '@/defaults/routes.default';
import { Box } from '@chakra-ui/react';
import PageLoader from '@/components/page-loader';

const GroupList = () => {
  const navigate = useNavigate();
  const { groups, isLoading } = useGroups();

  const handleClick = (id: string) => {
    navigate(`${routes.groups}/${id}`);
  };

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Box display="grid" gap="1rem" gridTemplateColumns={{ sm: 'auto', md: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }}>
      {groups.map((group) => (
        <GroupCard key={group.id} group={group} onClick={handleClick} />
      ))}
    </Box>
  );
};

export default GroupList;
