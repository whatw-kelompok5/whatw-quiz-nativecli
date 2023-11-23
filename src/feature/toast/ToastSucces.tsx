import {
  useToast,
  Toast,
  Button,
  VStack,
  ToastTitle,
  ToastDescription,
  ButtonText,
  View,
  Text,
} from '@gluestack-ui/themed';

export function ToastSuccess() {
  const toast = useToast();
  return (
    <View>
      {toast.show({
        placement: 'top',
        render: ({id}) => {
          return (
            <Toast nativeID={'toast-' + id} action="success" variant="accent">
              <VStack space="xs">
                <ToastTitle>Login success!</ToastTitle>
                <ToastDescription>Welcome...</ToastDescription>
              </VStack>
            </Toast>
          );
        },
      })}
    </View>
  );
}
