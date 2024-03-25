import { Box, BoxProps, Spinner } from '@chakra-ui/react';

const PageLoader = ({ ...rest }: BoxProps) => {
  return (
    <Box display="grid" w="100%" h="80vh" {...rest}>
      <Spinner alignSelf="center" justifySelf="center" variant="brand" speed="0.65s" emptyColor="gray.300" />
    </Box>
  );
};

export default PageLoader;
