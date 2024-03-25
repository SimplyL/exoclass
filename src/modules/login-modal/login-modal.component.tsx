import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  InputGroup,
  InputRightElement,
  ModalProps,
  IconButton,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginFormData } from './interfaces/login-form.interface';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { api } from '@/api';
import { apiPaths } from '@/api/paths';
import { useAuthStore } from '@/store';

const LoginModal = ({ isOpen, onClose, ...rest }: Omit<ModalProps, 'children'>) => {
  const [show, setShow] = useState(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const setToken = useAuthStore((state) => state.setToken);
  const { register, ...methods } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (data: LoginFormData) => {
    try {
      const {
        data: { token },
      } = await api.post(`${apiPaths.login}`, data);

      setToken(token);
      onClose();
    } catch (error) {
      setHasError(true);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} {...rest}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Welcome back!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired mb=".5rem" onFocus={() => setHasError(false)}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" {...register('email')} placeholder="Email" />
            </FormControl>
            <FormControl isRequired mb=".5rem" onFocus={() => setHasError(false)}>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input type={show ? 'text' : 'password'} {...register('password')} placeholder="Password" />
                <InputRightElement>
                  <IconButton
                    size="xs"
                    onClick={() => setShow(!show)}
                    isRound
                    aria-label="Show password"
                    icon={<MdOutlineRemoveRedEye size="20" />}
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {hasError && (
              <Alert status="error" mt="1rem" borderRadius="base" variant="top-accent">
                <AlertIcon />
                Incorrect email or password
              </Alert>
            )}
          </ModalBody>
          <ModalFooter>
            <Button w="100%" borderRadius="base" colorScheme="brandPurple" type="submit">
              Sign in
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default LoginModal;
