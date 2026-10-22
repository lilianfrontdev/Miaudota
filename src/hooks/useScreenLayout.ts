import { useWindowDimensions } from 'react-native';

const MAX_CONTENT_WIDTH = 480;
const COMPACT_HEIGHT = 720;

export function useScreenLayout() {
  const { width, height } = useWindowDimensions();

  return {
    screenWidth: Math.min(width, MAX_CONTENT_WIDTH),
    screenHeight: height,
    compact: height < COMPACT_HEIGHT,
  };
}