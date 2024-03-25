import { ComponentStyleConfig, createMultiStyleConfigHelpers } from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(['descriptionContainer']);

const Group: ComponentStyleConfig = helpers.defineMultiStyleConfig({
  baseStyle: {
    descriptionContainer: {
      ol: {
        listStylePosition: 'inside',
        textIndent: '1rem',
      },
    },
  },
});

export default Group;
