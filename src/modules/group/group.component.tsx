import { Box, Heading, useMultiStyleConfig } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import InfoCard from '@/components/info-card';
import {
  MdOutlineCalendarMonth,
  MdOutlineQueryBuilder,
  MdSchool,
  MdLocationPin,
  MdContactPhone,
  MdBarChart,
} from 'react-icons/md';
import { useGroup } from './hooks/use-group.hook';
import GroupImageBlock from './components/group-image-block.components';
import { formatDuration, getGroupSchedule } from '@/helpers/format-date.helper';
import GroupSubscriptionCard from './components/group-subscription-card';
import { formatAgeGroup, formatAvailableSpots, formatContactDetails } from './helpers/format-text.helper';
import LocationLabel from '@/components/location-label';
import { useBreakpoint } from '@/hooks/use-breakpoint.hook';
import PageLoader from '@/components/page-loader';

const Group = () => {
  const { id } = useParams();
  const { group, isLoading } = useGroup({ id });
  const { descriptionContainer } = useMultiStyleConfig('Group');
  const { activity } = group || {};

  const { isTablet } = useBreakpoint();

  if (isLoading) {
    return <PageLoader />;
  }

  if (!group) {
    return null;
  }

  return (
    <Box display="grid" gridTemplateColumns={{ md: '4fr 2fr', sm: '1fr' }} gap="1rem">
      <Box>
        <GroupImageBlock images={activity?.images ?? []} />
        {!isTablet && <GroupSubscriptionCard title="Select participants" group={group} mt="1rem" />}
        <Heading as="h1" size="lg" py="1rem">
          {activity?.name}
        </Heading>
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap="1rem">
          <InfoCard icon={MdBarChart} title="Age group and Level">
            {`${formatAgeGroup(group.age_groups)} - ${group.difficulty_type.name}`}
          </InfoCard>
          <InfoCard icon={MdLocationPin} title="Location">
            <LocationLabel
              street={group.location.street}
              houseNumber={group.location.house_number}
              city={group.location.city}
            />
          </InfoCard>
          <InfoCard icon={MdOutlineCalendarMonth} title="Duration">
            {formatDuration(group.start_date, group.end_date)}
          </InfoCard>
          <InfoCard icon={MdSchool} title="Available spots">
            {formatAvailableSpots(group.capacity, group.attendees)}
          </InfoCard>
          <InfoCard icon={MdOutlineQueryBuilder} title="Schedule">
            {getGroupSchedule(group.group_days_schedule)}
          </InfoCard>
          <InfoCard icon={MdContactPhone} title="Contacts">
            {formatContactDetails(group.provider.phone, group.provider.email)}
          </InfoCard>
        </Box>
        <Heading as="h2" size="md" py="1rem">
          Description
        </Heading>
        <Box sx={descriptionContainer}>{parse(activity?.description || '')}</Box>
      </Box>
      {isTablet && <GroupSubscriptionCard title="Select participants" group={group} />}
    </Box>
  );
};

export default Group;
