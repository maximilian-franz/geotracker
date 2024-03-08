import {LineLayer, PointAnnotation, ShapeSource} from '@rnmapbox/maps';
import {Position} from '@rnmapbox/maps/lib/typescript/src/types/Position';
import React, {useMemo, useRef} from 'react';
import {Image, StyleSheet, View} from 'react-native';

const MarkerWithLine = ({
  coordinates,
  title,
  iconUrl,
  iconSize = 40,
  lineColor = '#ff0000',
}: {
  coordinates: Position[];
  title: string;
  iconUrl: string;
  iconSize: number;
  lineColor: number;
}) => {
  const styles = {
    annotationContainer: {
      alignItems: 'center',
      backgroundColor: 'white',
      borderColor: lineColor,
      borderRadius: iconSize,
      borderWidth: StyleSheet.hairlineWidth,
      height: iconSize,
      justifyContent: 'center',
      overflow: 'hidden',
      width: iconSize,
    },
    line: {lineColor: lineColor},
  };
  const features: GeoJSON.FeatureCollection = useMemo(() => {
    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          id: 'a-feature',
          geometry: {
            type: 'LineString',
            coordinates,
          },
          properties: {},
        } as const,
      ],
    };
  }, [coordinates]);
  const pointAnnotation = useRef<PointAnnotation>(null);
  return (
    <>
      <ShapeSource id={`shape-source-${title}`} shape={features}>
        <LineLayer id={`line-layer-${title}`} style={styles.line} />
      </ShapeSource>
      <PointAnnotation
        id="annotation"
        title={title}
        coordinate={coordinates[0]}
        ref={pointAnnotation}>
        <View style={styles.annotationContainer}>
          <Image
            source={{uri: iconUrl}}
            style={{width: iconSize, height: iconSize}}
            onLoad={() => pointAnnotation.current?.refresh()}
            // Prevent rendering bitmap at unknown animation state
            fadeDuration={0}
          />
        </View>
      </PointAnnotation>
    </>
  );
};

export default MarkerWithLine;
