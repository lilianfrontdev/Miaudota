import {
  Image,
  type ImageProps,
  type ImageStyle,
  type StyleProp,
} from 'react-native';

type DecorativeShapeProps = {
  source: ImageProps['source'];
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageProps['resizeMode'];
};

export function DecorativeShape({
  source,
  style,
  resizeMode = 'contain',
}: DecorativeShapeProps) {
  return (
    <Image
      source={source}
      resizeMode={resizeMode}
      pointerEvents="none"
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[{ position: 'absolute' }, style]}
    />
  );
}