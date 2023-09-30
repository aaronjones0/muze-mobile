import { TextInput } from 'react-native';
import Box from '../Box/Box';
import Text from '../Text/Text';
import { useTheme } from '@shopify/restyle';

export interface NumericInputProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  editing?: boolean;
}

export default function NumericInput({
  label,
  value,
  onValueChange,
  editing,
}: NumericInputProps) {
  const theme = useTheme();
  const colors = theme.colors;

  return (
    <Box
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
        value={value.toString()}
        onChangeText={(value) => onValueChange(+value)}
        editable={editing}
        style={{ color: colors.text1, fontSize: 16 }}
        keyboardType='numeric'
      />
    </Box>
  );
}
