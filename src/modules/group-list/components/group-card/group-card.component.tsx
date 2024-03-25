import {
  Box,
  Button,
  Image,
  Tag,
  useMultiStyleConfig,
  Text,
  Heading,
  Card,
  CardProps,
  CardFooter,
  CardBody,
} from '@chakra-ui/react';
import parse from 'html-react-parser';
import { MdOutlineCalendarMonth, MdOutlineQueryBuilder, MdPeople, MdLocationCity } from 'react-icons/md';
import { GroupItem } from '@/interfaces/group-list.interface';
import { formatMonthAndDay, getGroupSchedule } from '@/helpers/format-date.helper';
import IconLabel from '@/components/icon-label';

export interface GroupCardProps extends Omit<CardProps, 'onClick'> {
  group: GroupItem;
  onClick: (id: string) => void;
}

const GroupCard = ({ onClick, group, ...rest }: GroupCardProps) => {
  const {
    name,
    difficulty_type: { name: difficultyName },
    activity: { description },
    age_groups,
    image,
    is_started,
    start_date,
    attendees,
    capacity,
    location: { street, house_number, city },
    group_days_schedule,
    external_key,
  } = group;
  const { descriptionContainer } = useMultiStyleConfig('GroupCard');

  const getRemainingSpots = (): string => {
    return `${capacity - attendees} spots left`;
  };

  const getAgeGroups = (): string => {
    return `${age_groups.join(',')} year olds`;
  };

  const getStartDate = (): string => {
    return is_started ? 'Already started' : formatMonthAndDay(start_date);
  };

  const renderAddress = (): React.ReactNode => {
    const address = `${street} ${house_number},`;

    return (
      <Box>
        {address}
        <Text ml=".5rem" as="span" color="brandPurple.500" fontWeight={600}>
          {city}
        </Text>
      </Box>
    );
  };

  return (
    <Card variant="outline" display="grid" gridAutoFlow="row" {...rest}>
      <Box position="relative">
        <Image src={image} alt={name} />
        <Box position="absolute" display="flex" flexDirection="column" top={0} right={0} p="1rem" gap="0.5rem">
          <Tag variant="brand">{difficultyName}</Tag>
          <Tag variant="brand">{getAgeGroups()}</Tag>
        </Box>
      </Box>
      <CardBody p="1rem">
        <Box display="grid" gridTemplateColumns="1fr auto">
          <IconLabel icon={MdPeople}>{getRemainingSpots()}</IconLabel>
          <IconLabel icon={MdOutlineCalendarMonth}>{getStartDate()}</IconLabel>
        </Box>
        <Heading as="h1" size="md" my=".5rem">
          {name}
        </Heading>
        <Box mb=".5rem" sx={descriptionContainer}>
          {parse(description)}
        </Box>
        <IconLabel icon={MdLocationCity}>{renderAddress()}</IconLabel>
        <IconLabel icon={MdOutlineQueryBuilder}>{getGroupSchedule(group_days_schedule)}</IconLabel>
      </CardBody>
      <CardFooter alignSelf="end" p={0}>
        <Button w="full" colorScheme="brandPurple" borderBottomRadius="base" onClick={() => onClick(external_key)}>
          Subscribe
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GroupCard;
