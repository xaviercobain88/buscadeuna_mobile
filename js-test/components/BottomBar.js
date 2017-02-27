/**
 * Created by Dennis on 2/5/16.
 */

import React, {
    Component,
    StyleSheet,
    Image,
    Platform,
    Animated,
    ListView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    PropTypes
} from 'react-native';


export default class BottomBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    render() {
        var PlaceHolderTxt = 'add '+this.props.type;
        return (
            <View style={styles.searchContainer}>
                <TextInput style={styles.input}
                           placeholder={PlaceHolderTxt}
                           placeholderTextColor="#b3b3b3"
                           onChangeText={(text) => this.setState({text: text})}

                            value={this.state.text}
                />
                <Image style={styles.image} resizeMode={Image.resizeMode.contain} source={require('../images/ic_note_add.png')}/>
                <TouchableOpacity style={styles.button} onPress={()=>{

                this.props.onAddItem(this.state.text)();
               this.setState({text: ""})
                }}>
                    <Text style={styles.text}>+</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

BottomBar.propTypes = {
    onAddItem: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired
};


var styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'stretch',
        flexDirection: 'row',
        padding: 10
    },
    title: {
        color: '#b3b3b3',
        textAlign: 'center',
        fontWeight: '100',
        fontSize: 11,
        backgroundColor: '#b3b',
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'column',
        backgroundColor: '#333333',
        height: 40,
        borderRadius: 5,
        padding: 5,
        fontSize: 12,
        color: '#ffffff',
        paddingLeft: 40
    },
    button: {
        flex: .1,
        alignItems: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: '#e63327',
        borderRadius: 5,
        padding: 5,
        marginLeft: 10,
        height: 40
    },
    text: {
        flex: .1,
        textAlign: 'center',
        fontSize: 16,
        color:'#ffffff',
        lineHeight: 14,
        fontWeight: '600'
    },
    image: {
        flex: .1,
        width: 20,
        height: 20,
        position: 'absolute',
        left: 20,
        alignSelf: 'stretch',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: 10,
        borderRightWidth: 1,
        borderColor: '#ffffff',
        opacity: .3,
        justifyContent: 'space-between'
    }
});