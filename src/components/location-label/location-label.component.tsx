import { Text } from '@chakra-ui/react';

export interface LocationLabelProps {
  street: string;
  houseNumber: string;
  city: string;
}

const LocationLabel = ({ street, houseNumber, city }: LocationLabelProps) => {
  return (
    <>
      {`${street} ${houseNumber},`}
      <Text ml=".5rem" as="span" color="brandPurple.500" fontWeight={600}>
        {city}
      </Text>
    </>
  );
};

export default LocationLabel;
