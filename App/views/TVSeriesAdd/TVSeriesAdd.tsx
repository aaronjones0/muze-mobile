import { useEffect } from "react";
import { useAuth } from "../../../lib/providers/AuthProvider";
import Box from "../../components/Box/Box";
import Text from "../../components/Text/Text";

export default function TVSeriesAdd({navigation}) {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) navigation.navigate('Home');
  }), [user];

  return (
    <Box>
      <Text>Add a TV Series</Text>
    </Box>
  )
}