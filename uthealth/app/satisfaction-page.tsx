import { UserProvider } from '@/user/UserContext'
import 'react-native-gesture-handler';
import '../global.css';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font'

const rpeLevels = [
    { label: 'Very Very Hard', value: 10, icon: '🥵', color: '#00000' },
    { label: 'Very Hard', value: 9, icon: '😣', color: '#EF5350' },
    { label: 'Hard', value: 8, icon: '😕', color: '#F06292' },
    { label: 'Moderate', value: 6, icon: '😐', color: '#FFB74D' },
    { label: 'Light', value: 4, icon: '🙂', color: '#AED581' },
    { label: 'Very Light', value: 2, icon: '😊', color: '#81C784' },
    { label: 'Very Very Light', value: 1, icon: '😁', color: '#66BB6A' },
];

export default function RPEList() {
    const [selected, setSelected] = useState<number | null>(null);

    const handleSelect = (value: number) => {
        setSelected(value);
    };

    const [fontsLoaded] = useFonts({
        'Instrument-Sans-Regular': require('../assets/fonts/Instrument-Sans.ttf'),

    })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>How hard was that workout?</Text>
            <View style={styles.container1}>
                {rpeLevels.map((item, index) => (
                    <View key={item.value}>
                        <TouchableOpacity
                            style={styles.row}
                            onPress={() => handleSelect(item.value)}
                        >
                            <Text style={[styles.icon, { color: item.color }]}>{item.icon}</Text>
                            <View style={styles.lineContainer}>
                                <View style={styles.rotate}>
                                    <View style={[styles.dot, selected === item.value && styles.activeDot]} />
                                </View>
                            </View>
                            <Text style={styles.label}>{item.label}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <View style={styles.verticalLine} />
                <View style={{position: 'absolute', left: 80, top: 40, zIndex: 1}}>≈
                {rpeLevels.map((item, index) => (
                    <View key={item.value}>
                        <View
                            style={styles.row}
                        >
                            <View style={styles.lineContainer}>
                                <View style={styles.rotate}>
                                    <View style={[styles.dot, selected === item.value && styles.activeDot]} />
                                </View>
                            </View>

                            <Text style={styles.label}></Text>
                        </View>
                    </View>
                ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rotate: {
        transform: [{ rotate: '45deg' }],
    },
    title: {
        fontSize: 27,
        fontWeight: 700,
        marginTop: 50,
        marginHorizontal: 17,
        fontFamily: 'Instrument Sans',
    },
    container: {
        paddingTop: 40,
        paddingLeft: 0,
        alignItems: 'center',
    },
    dotEraser: {
        width: 10,
        height: 10,
        backgroundColor: '#327689',
        zIndex: 1,
        position: 'relative'
      },
    container1: {
        paddingTop: 40,
        paddingLeft: 40,
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 18,
        width: '90%',
        zIndex: 2,
    },
    containerLine: {
        paddingLeft: 30,
        position: 'absolute',
        backgroundColor: "#AAFFAA",
    },
    icon: {
        fontSize: 18,
        width: 40,
        textAlign: 'center',
    },
    label: {
        fontSize: 22,
        marginLeft: 12,
        flex: 2,
        fontWeight: 700,
        color: "#898A8D"
    },
    lineContainer: {
        alignItems: 'center',
        width: 25,
        position: 'relative',
    },
    verticalLine: {
        left: 91,
        position: 'absolute',
        top: 70,
        width: 3,
        zIndex: 0,
        height: 380,
        backgroundColor: '#327689',
    },
    dot: {
        width: 10,
        height: 10,
        backgroundColor: '#327689',
        zIndex: 2,
        position: 'relative'
    },
    activeDot: {
        width: 9,
        height: 9,
        backgroundColor: '#b2d8e3',
        borderColor: "#327689",
        borderWidth: 1,
    },
});