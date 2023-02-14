import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDECE3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerLocation: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
        margin: 30,
        paddingVertical: 5,
    },
    displayData: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        width: '75%',
        justifyContent: 'space-between',
        margin: 5,
        padding: 10,
    },
    displayDataRow: {
        backgroundColor: '#EDECE3',
        flexDirection: 'row',
        alignItems: 'center',
        width: '75%',
        justifyContent: 'space-between',
    },
    displayDataRowItem: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        width: '45%',
        justifyContent: 'space-evenly',
        padding: 5,
    },
    headerText: {
        fontSize: 20,
        color: 'grey',
        fontWeight: 'bold',
    },
    cityInput: {
        borderBottomColor: 'grey',
        borderBottomWidth: 1
    },
    headerLine: {
        backgroundColor: '#EDECE3',
        width: 1,
        height: 40,
    },
    sunDataContainer: {
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        width: '75%',
        justifyContent: 'space-between',
        margin: 5,
        padding: 10,
    },
    sunDataRow: {
        backgroundColor: '#EDECE3',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    sunDataItem: {
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        justifyContent: 'space-evenly',
    },
});

export default styles;