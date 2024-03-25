import { Box, BoxProps, Image } from '@chakra-ui/react';
import { apiURL } from '@/api';
import { GroupItemActivityImage } from '@/interfaces/group-list.interface';

export interface GroupImageBlockProps extends BoxProps {
  images: GroupItemActivityImage[];
}

const GroupImageBlock = ({ images, ...rest }: GroupImageBlockProps) => {
  const [firstImage, secondImage, thirdImage] = images;

  const renderImage = (image: GroupItemActivityImage) => {
    if (!image) {
      return;
    }

    return <Image key={image.id} src={`${apiURL}/${image.path}`} alt={image.name} />;
  };

  if (!images.length) {
    return;
  }

  return (
    <Box display="grid" gridTemplateColumns="2fr 1fr" gap=".2rem" {...rest}>
      {renderImage(firstImage)}
      <Box display="grid" gap=".5rem" ml=".3825rem">
        {renderImage(secondImage)}
        {renderImage(thirdImage)}
      </Box>
    </Box>
  );
};

export default GroupImageBlock;
