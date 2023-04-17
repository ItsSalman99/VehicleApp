import React from 'react';
import {
    StyleSheet,
    View,
    Text as RNText,
    Dimensions,
    Animated
} from 'react-native';
import { GestureHandler, Svg } from 'expo';
import * as d3Shape from 'd3-shape';
import color from 'randomcolor';
import { snap } from '@popmotion/popcorn';
const { PanGestureHandler, State } = GestureHandler;
const { Path, G, Text, TSpan } = Svg;
const { width } = Dimensions.get('screen');

const numberOfSegments = 12;
const wheelSize = width * 0.95;
const fontSize = 26;
const oneTurn = 360;
const angleBySegment = oneTurn / numberOfSegments;
const angleOffset = angleBySegment / 2;
const knobFill = color({ hue: 'purple' });

const wheel = () => {
    const data = Array.from({ length: numberOfSegments }).fill(1);
    const arcs = d3Shape.pie()(data);
    const colors = color({
        luminosity: 'dark',
        count: numberOfSegments
    });

    return arcs.map((arc, index) => {
        const instance = d3Shape
            .arc()
            .padAngle(0.01)
            .outerRadius(width / 2)
            .innerRadius(20);

        return {
            path: instance(arc),
            color: colors[index],
            value: Math.round(Math.random() * 10 + 1) * 200, //[200, 2200]
            centroid: instance.centroid(arc)
        };
    });
};

export default wheel;