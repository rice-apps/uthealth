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
                    <TouchableOpacity
                        key={item.value}
                        style={styles.row}
                        onPress={() => handleSelect(item.value)}
                    >
                        <Text style={[styles.icon, { color: item.color }]}>{item.icon}</Text>
                        <View style={styles.lineContainer}>
                            <View style={styles.rotate}>
                                <View style={[styles.dot, selected === item.value && styles.activeDot]} />

                            </View>
                            {/* draw connector lines (except for last item) */}
                            {index !== rpeLevels.length - 1 && <View style={styles.verticalLine} />}
                        </View>
                        <Text style={styles.label}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
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
    },
    icon: {
        fontSize: 18,
        width: 40,
        textAlign: 'center',
    },
    label: {
        fontSize: 22,
        marginLeft: 12,
        flex: 1,
    },
    lineContainer: {
        alignItems: 'center',
        width: 25,
        position: 'relative',
    },
    verticalLine: {
        alignItems: 'center',
        position: 'absolute',
        top: 10,
        width: 3,
        height: 61,
        backgroundColor: '#327689',
    },
    dot: {
        width: 10,
        height: 10,
        backgroundColor: '#327689',
        zIndex: 1,
    },
    activeDot: {
        width: 9,
        height: 9,
        backgroundColor: '#b2d8e3',
        borderColor: "#327689",
        borderWidth: 1,
    },
});