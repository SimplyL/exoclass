import { Student } from '@/interfaces/student.interface';
import { useStudentsStore } from '@/store';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalProps,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Input,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export interface GroupStudentModalProps extends Omit<ModalProps, 'children'> {
  studentIndex: number | null;
}

const GroupStudentModal = ({ isOpen, onClose, studentIndex }: GroupStudentModalProps) => {
  const addStudent = useStudentsStore((state) => state.addStudent);
  const editStudent = useStudentsStore((state) => state.editStudent);
  const students = useStudentsStore((state) => state.students);
  const { register, reset, ...methods } = useForm<Student>({
    defaultValues: {
      name: '',
      lastName: '',
      age: null,
      isSelected: false,
    },
  });

  const handleClose = () => {
    reset({});
    onClose();
  };

  const handleSubmit = (student: Student) => {
    handleClose();
    studentIndex !== null ? editStudent(student, studentIndex) : addStudent(student);
  };

  useEffect(() => {
    if (studentIndex !== null && students[studentIndex]) {
      reset(students[studentIndex]);
    }

    reset({});
  }, [students, reset, studentIndex]);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add student</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired mb=".5rem">
              <FormLabel>First name</FormLabel>
              <Input {...register('name')} placeholder="First name" />
            </FormControl>
            <FormControl isRequired mb=".5rem">
              <FormLabel>Last name</FormLabel>
              <Input {...register('lastName')} placeholder="Last name" />
            </FormControl>
            <FormControl mb=".5rem">
              <FormLabel>Age</FormLabel>
              <NumberInput colorScheme="brandPurple" min={1}>
                <NumberInputField {...register('age')} placeholder="Age" />
              </NumberInput>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button borderRadius="base" variant="outline" colorScheme="brandPurple" mr={3} onClick={handleClose}>
              Close
            </Button>
            <Button borderRadius="base" colorScheme="brandPurple" type="submit">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default GroupStudentModal;
