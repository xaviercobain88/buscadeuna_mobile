/**
 * Created by Dennis on 11/5/16.
 */

import React, {Component, PropTypes} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput
} from 'react-native';
import {
    Actions
} from 'react-native-router-flux';
import OptionModal from '../components/OptionModal'


export default class SearchingHeaderBar extends React.Component {
    constructor(props) {
        super(props);
        let categories = this.props.categories.map(category => {
            return {
                ...category, onPress: ()=> {
                    category.onPress();
                    setTimeout(()=>this.setState({isVisibleCategoryModal: false}),150)
                }
            }
        });
        this.state = {
            isVisibleCategoryModal: false,
            categories: categories
        }

    }


    render() {
        return <View style={[styles.container]}>

            <View style={{ flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center', flex: 1}}>
                <TouchableOpacity onPress={()=>Actions.pop()}><Text
                    style={styles.backIcon}>b</Text></TouchableOpacity>
                {this.props.showFts ?
                    <View style={styles.searchContainer}>
                        <View style={styles.inputTextContainer}>
                            <Text style={styles.searchIcon}>s</Text>
                            <TextInput style={styles.searchInputText}
                                       placeholder={"Busca lo que quieras"}
                                       placeholderTextColor="#999" onFocus={this.props.onFocusOnSearch}
                                       onChangeText={this.props.onFtsChangeText}
                            />
                        </View>
                        <View style={styles.separator}/>
                    </View> :
                    <TouchableOpacity onPress={()=>this.setState({isVisibleCategoryModal: true})}>
                        <View style={styles.categorySelector}>
                            <Text
                                style={styles.selectedCategory}>{this.props.category0 ? this.props.category0.toUpperCase() : "SELECCIONAR"}</Text>
                            <Text style={styles.chevron}>a</Text>

                        </View>
                    </TouchableOpacity>}


            </View>


            {this.props.showFts ?
                <TouchableOpacity onPress={this.props.onHideFts}><Text
                    style={[styles.backIcon, {color:'#3F72EA', marginRight: 20, marginLeft: 0,fontSize: 19}]}>r</Text></TouchableOpacity> :
                <TouchableOpacity onPress={this.props.onShowFts}><Text
                    style={[styles.backIcon, {color:'#999', marginRight: 20, marginLeft: 0,fontSize: 19}]}>s</Text></TouchableOpacity>}

            <OptionModal isVisible={this.state.isVisibleCategoryModal}
                         items={this.state.categories}
                         onTouchOut={()=>this.setState({isVisibleCategoryModal: false})}
            />
        </View>

    }
}

SearchingHeaderBar.propTypes = {
    category0: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    showFts: PropTypes.bool.isRequired,
    onShowFts: PropTypes.func.isRequired,
    onHideFts: PropTypes.func.isRequired,
    onFtsChangeText: PropTypes.func.isRequired,

};
const styles = {

        container: {
            flexDirection: 'row',
            shadowColor: "black",
            shadowOpacity: 30,
            paddingTop: 34,
            paddingBottom: 18,
            alignItems: 'center',
            justifyContent: 'space-between'
        },

        backIcon: {
            fontFamily: 'icons',
            fontSize: 22,
            marginLeft: 20,
        },

        categorySelector: {
            flexDirection: 'row',
            paddingHorizontal: 20,
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: 32

        },

        selectedCategory: {
            fontSize: 18,
            color: '#222',
            fontFamily: 'Raleway-Regular',
        },

        chevron: {
            fontFamily: 'icons',
            fontSize: 18,
            color: '#222',
            marginLeft: 12


        },
        searchContainer: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            paddingHorizontal: 20
        },

        separator: {
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: '#e7e7e7',
        },
        inputTextContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            height: 31

        },
        searchIcon: {
            fontFamily: 'icons',
            fontSize: 16,
            color: '#999',
            marginTop: 2,
            marginRight: 12
        },
        searchInputText: {
            fontSize: 18,
            flex: 1,
            fontFamily: 'Raleway-Regular',
        }


    }
    ;
