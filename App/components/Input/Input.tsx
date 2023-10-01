import { TextInput } from 'react-native';
import Box from '../Box/Box';
import Text from '../Text/Text';
import { useTheme } from '@shopify/restyle';

export interface InputProps {
  label: string;
  value: string;
  onValueChange: (text: string) => void;
  editing?: boolean;
  multiline?: boolean;
}

export default function Input({
  label,
  value,
  onValueChange,
  editing,
  multiline,
}: InputProps) {
  const theme = useTheme();
  const colors = theme.colors;

  return (
    <Box
      height={multiline ? '100%' : null}
      width='100%'
      paddingVertical='s4'
      paddingHorizontal='s6'
      borderWidth={1}
      borderColor='primarySurfaceBorder'
      borderRadius={16}
      backgroundColor={!editing ? 'primarySurface' : 'backgroundSurface'}
    >
      <Text variant='label'>{label}</Text>
      <TextInput
        multiline={multiline}
        value={value}
        onChangeText={(text) => onValueChange(text)}
        editable={editing}
        style={{ color: colors.text1, fontSize: 20, fontWeight: '500' }}
      />
    </Box>
  );
}
