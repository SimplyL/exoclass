import { formatMoney } from '@/helpers/format-money.helper';
import { Box, Heading, Radio, RadioProps, Text } from '@chakra-ui/react';

export interface GroupPaymentOptionsRadio extends RadioProps {
  label: string;
  description: string;
  price: number;
  currency: string;
}

const GroupPaymentOptionsRadio = ({ label, description, price, currency, ...rest }: GroupPaymentOptionsRadio) => {
  return (
    <Radio w="full" colorScheme="brandPurple" {...rest}>
      <Box display="grid" gridTemplateColumns="1fr auto">
        <Heading size="sm">{label}</Heading>
        <Text justifySelf="end" color="brandPurple.500" fontWeight={600}>
          {formatMoney(price, currency)}
        </Text>
      </Box>
      <Text fontSize={14}>{description}</Text>
    </Radio>
  );
};

export default GroupPaymentOptionsRadio;
