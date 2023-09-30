import {
  useRestyle,
  spacing,
  border,
  backgroundColor,
  SpacingProps,
  BorderProps,
  BackgroundColorProps,
  composeRestyleFunctions,
} from '@shopify/restyle';

import Box from '../Box/Box';
import { Theme } from '../../theme/theme';

type RestyleProps = SpacingProps<Theme> &
  BorderProps<Theme> &
  BackgroundColorProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
  spacing,
  backgroundColor,
]);

type Props = RestyleProps & {
  children: React.ReactNode;
};

const Surface = ({ children, ...rest }: Props) => {
  const props = useRestyle(restyleFunctions, rest);

  return <Box {...props}>{children}</Box>;
};

export default Surface;
