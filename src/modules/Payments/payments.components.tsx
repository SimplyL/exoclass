import { Box, Heading, Icon } from '@chakra-ui/react';
import { MdOutlineSettings } from 'react-icons/md';

const Payments = () => (
  <Box display="grid" justifyItems="center" alignItems="center" h="80vh" w="full">
    <Box display="grid" justifyItems="center">
      <Icon as={MdOutlineSettings} color="brandPurple.500" boxSize={50} />
      <Heading color="brandPurple.500">Payments page is under construction...</Heading>
    </Box>
  </Box>
);

export default Payments;
