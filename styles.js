import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: '#EDECE3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
    },
    loaded: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 35,
        paddingVertical: 150,
    },
    item1: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    item2: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 10,
    },
    setRow: {
        width: '100%',
        paddingHorizontal: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    weatherIconImage: {
        textAlign: 'center',
        width: 45,
        textShadowRadius: 4,
        textShadowOffset: { width: 0, height: 0 }
    },
    whiteText: {
        color: 'white',
    },
    grayText: {
        color: 'gray',
    },
    cityInput: {
        margin: 20,
        fontSize: 30,
    },
    unitText: {
        fontSize: 15,
        color: 'white',
    },
    weatherIcon: {
        margin: 20,
    },
    timeText: {
        margin: 10,
        fontSize: 20,
    },
    Text30: {
        fontSize: 30,
        marginTop: 10,
    }
});

export default styles;