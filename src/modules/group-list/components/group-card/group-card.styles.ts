import { ComponentStyleConfig, createMultiStyleConfigHelpers } from '@chakra-ui/react';

const helpers = createMultiStyleConfigHelpers(['descriptionContainer']);

const GroupCard: ComponentStyleConfig = helpers.defineMultiStyleConfig({
  baseStyle: {
    descriptionContainer: {
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: '3',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
});

export default GroupCard;
