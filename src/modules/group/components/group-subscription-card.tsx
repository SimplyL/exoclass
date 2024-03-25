import { Box, Button, Card, Text, CardProps, Heading, RadioGroup, Stack, StackDivider } from '@chakra-ui/react';
import { MdAdd } from 'react-icons/md';
import GroupPaymentOptionsRadio from './group-payment-options-radio.component';
import { GroupItem } from '@/interfaces/group-list.interface';
import GroupStudentModal from './group-student-modal.component';
import GroupStudent from './group-student.component';
import { useGroupSubscribtion } from '../hooks/use-group-subscribtion.hook';

export interface GroupSubscriptionCardProps extends CardProps {
  title: string;
  group: GroupItem;
}

const GroupSubscriptionCard = ({ title, group, ...rest }: GroupSubscriptionCardProps) => {
  const {
    onOpen,
    isOpen,
    students,
    selectStudent,
    isAuthorized,
    currency_code,
    paymentOptions,
    selectedSubscription,
    handleEditStudent,
    handleRadioSelect,
    getTotalAmount,
    onAddToCart,
    selectedStudent,
    handleClose,
  } = useGroupSubscribtion({
    group,
  });

  const isStudentSelected = students.some(({ isSelected }) => isSelected) && selectedSubscription;

  return (
    <Card variant="outline" alignSelf="flex-start" {...rest}>
      <Stack divider={<StackDivider />} spacing="4">
        <Heading px="1rem" pt="1rem" size="sm">
          {title}
        </Heading>
        {!!students.length && (
          <Box display="grid" gap=".5rem">
            {students.map((student, index) => (
              <GroupStudent
                onSelect={() => selectStudent(index)}
                onEdit={() => handleEditStudent(index)}
                px="1rem"
                key={`${student.name}-${index}`}
                student={student}
              />
            ))}
          </Box>
        )}
        <Box display="grid">
          <Button
            isDisabled={!isAuthorized}
            justifySelf="end"
            size="sm"
            leftIcon={<MdAdd size="22" />}
            variant="link"
            px="1rem"
            colorScheme="brandPurple"
            onClick={onOpen}
          >
            Add new
          </Button>
        </Box>
        <Box px="1rem">
          <Heading size="sm" mb="1rem">
            Payment options
          </Heading>
          <RadioGroup onChange={handleRadioSelect} value={selectedSubscription}>
            {paymentOptions.map(({ label, description, group_price, name }, index) => (
              <GroupPaymentOptionsRadio
                isDisabled={!isAuthorized}
                value={name}
                pb="1rem"
                key={`${label}-${index}`}
                currency={currency_code}
                label={label}
                description={description}
                price={group_price}
              />
            ))}
          </RadioGroup>
        </Box>
        <Box>
          <Heading size="sm" px="1rem" mb="1rem" display="grid" gridTemplateColumns="1fr auto">
            Subtotal:
            <Text color="brandPurple.500">{getTotalAmount()}</Text>
          </Heading>
          <Button
            borderBottomRadius="base"
            colorScheme="brandPurple"
            w="full"
            isDisabled={!isAuthorized}
            onClick={isStudentSelected ? onAddToCart : onOpen}
          >
            {isStudentSelected ? 'Add to cart' : 'Enroll student'}
          </Button>
        </Box>
      </Stack>
      <GroupStudentModal studentIndex={selectedStudent} isOpen={isOpen} onClose={handleClose} />
    </Card>
  );
};

export default GroupSubscriptionCard;
