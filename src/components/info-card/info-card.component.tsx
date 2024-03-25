import { Box, Card, CardBody, CardProps, Heading, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';

export interface InfoCardProps extends CardProps {
  title: string;
  icon: IconType;
}

const InfoCard = ({ title, icon, children, ...rest }: InfoCardProps) => {
  return (
    <Card variant="outline" {...rest}>
      <CardBody p="1rem">
        <Box display="grid" gridTemplateColumns="auto 1fr" gridColumnGap=".5rem">
          <Icon as={icon} color="brandPurple.500" boxSize={5} />
          <Heading size="sm">{title}</Heading>
          <Box gridColumnStart="2" fontSize={14}>
            {children}
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
};

export default InfoCard;
