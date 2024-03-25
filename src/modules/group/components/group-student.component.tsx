import { BoxProps, Box, Avatar, Heading, Text, IconButton, Checkbox } from '@chakra-ui/react';
import { Student } from '@/interfaces/student.interface';
import { MdEdit } from 'react-icons/md';

export interface GroupStudentProps extends BoxProps {
  student: Student;
  onEdit: () => void;
  onSelect: () => void;
}

const GroupStudent = ({ student, onEdit, onSelect, ...rest }: GroupStudentProps) => {
  const { name, lastName, age, isSelected } = student;
  const fullName = `${name} ${lastName}`;

  return (
    <Box {...rest}>
      <Box display="grid" gridTemplateColumns="auto 1fr auto" gap="1rem">
        <Box display="grid" gridTemplateColumns="1fr auto" gap=".5rem" alignItems="center">
          <Checkbox colorScheme="brandPurple" onChange={onSelect} isChecked={isSelected} />
          <Avatar size="sm" name={fullName} />
        </Box>
        <Box>
          <Heading size="sm">{fullName}</Heading>
          <Text fontSize={12} color="gray.500">{`${age} years`}</Text>
        </Box>
        <IconButton
          onClick={onEdit}
          variant="link"
          colorScheme="brandPurple"
          aria-label="Edit student"
          icon={<MdEdit size="22" />}
        />
      </Box>
    </Box>
  );
};

export default GroupStudent;
