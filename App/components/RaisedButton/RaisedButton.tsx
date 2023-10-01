import { Button } from 'react-native';
import Box from '../Box/Box';
import { useTheme } from '@shopify/restyle';

export interface RaisedButtonProps {
  label: string;
  onPress: () => void;
}

export default function RaisedButton({ label, onPress }: RaisedButtonProps) {
  const theme = useTheme();

  return (
    <Box
      backgroundColor='backgroundSurface'
      borderColor='backgroundSurfaceBorder'
      borderLeftWidth={1}
      borderTopWidth={1}
      borderRightWidth={1}
      borderRadius={24}
      shadowColor='shadowColor'
      shadowOffset={{ width: 0, height: 4 }}
      shadowRadius={8}
      shadowOpacity={0.8}
      flexGrow={1}
    >
      <Button
        title={label}
        onPress={() => onPress()}
        color={theme.colors.text1}
      />
    </Box>
  );
}
