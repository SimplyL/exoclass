import { Box, Card, CardBody, CardProps, Divider, Heading, IconButton, Image, Text } from '@chakra-ui/react';
import { apiURL } from '@/api';
import LocationLabel from '@/components/location-label';
import { formatDuration, getGroupSchedule } from '@/helpers/format-date.helper';
import { CartItem as CartItemType } from '@/interfaces/cart.interface';
import { formatAgeGroup } from '@/modules/group/helpers/format-text.helper';
import { formatMoney } from '@/helpers/format-money.helper';
import { MdDeleteForever } from 'react-icons/md';

export interface CartItemProps extends CardProps {
  item: CartItemType;
  onRemove: () => void;
}

const CartItem = ({ item, onRemove, ...rest }: CartItemProps) => {
  const { student, group, group_price } = item;
  const {
    activity: { name, images },
    difficulty_type: { name: level },
    provider: { currency_code },
  } = group;

  const image = images[0];
  const fullStudentName = `${student.name} ${student.lastName}`;

  const renderLabel = (title: string, description: React.ReactNode) => (
    <Box mt=".5rem">
      <Box as="span" fontWeight="600" mr=".5rem">
        {title}
      </Box>
      <Box as="span">{description}</Box>
    </Box>
  );

  return (
    <Card variant="outline" alignSelf="flex-start" {...rest}>
      <Box position="relative">
        <Image src={`${apiURL}/${image.path}`} alt={image.name} />
        <Box position="absolute" top={0} right={0}>
          <IconButton
            isRound
            onClick={onRemove}
            variant="solid"
            aria-label="Remove item"
            icon={<MdDeleteForever size="24" />}
          />
        </Box>
      </Box>
      <CardBody>
        <Heading size="md" color="brandPurple.500">
          {name}
        </Heading>
        <Box fontSize={14}>
          {renderLabel(
            'Address',
            <LocationLabel
              street={group.location.street}
              houseNumber={group.location.house_number}
              city={group.location.city}
            />,
          )}
          {renderLabel('Duration', formatDuration(group.start_date, group.end_date))}
          {renderLabel('Participant', fullStudentName)}
          {renderLabel('Schedule', getGroupSchedule(group.group_days_schedule))}
          {renderLabel('Level', level)}
          {renderLabel('Age group:', formatAgeGroup(group.age_groups))}
        </Box>
        <Divider borderColor="gray.300" my="1rem" />
        <Box display="grid" gridTemplateColumns="1fr auto">
          <Text fontWeight="600">Price:</Text>
          <Text color="brandPurple.500" fontWeight="600">
            {formatMoney(group_price, currency_code)}
          </Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export default CartItem;
