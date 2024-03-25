import { Box, BoxProps, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

export interface IconLabel extends BoxProps {
  icon: IconType;
}

const IconLabel = ({ icon, children, ...rest }: IconLabel) => (
  <Box display="flex" gap="0.5rem" alignItems="center" {...rest}>
    <Icon as={icon} color="brandPurple.500" boxSize={5} />
    <Box as="span">{children}</Box>
  </Box>
);

export default IconLabel;
