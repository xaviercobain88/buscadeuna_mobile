/**
 * Created by xavier on 5/10/16.
 */
import React, {Component, PropTypes} from 'react';
import {
    View,
    Text,
    ListView,
    StyleSheet,
    StatusBar,
    Animated,
    ScrollView
} from 'react-native'
import SearchBar from '../SearchBar'
import SearchOptions from '../SearchOptions'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import TabBar from '../TabBar'

class HomeSection extends React.Component {
    constructor(props) {
        super(props);
    }

    getContent() {
        let content = <ScrollableTabView tabBarUnderlineColor="#222"
                                         tabBarActiveTextColor="#222"
                                         tabBarInactiveTextColor="#999"
                                         tabBarTextStyle={styles.tabHeader}
                                         scrollWithoutAnimation={true}>
            {this.props.categories.map(category => {
                return <View tabLabel={category.name} key={category.name}>

                </View>
            })}
        </ScrollableTabView>;
        if (this.props.isSearchingFocused) {
            content = <SearchOptions categories={this.props.categories}
                                     topSearches={this.props.topSearches}
                                     onCategorySelected={this.props.onCategorySelected}/>
        }
        return content
    }

    render() {

        return <View style={styles.container}>

            <SearchBar onFocusOnSearch={this.props.onFocusOnSearch}
                       isSearchingFocused={this.props.isSearchingFocused}
                       onBackButton={this.props.onBackButton}/>

            {this.getContent()}
            <TabBar selectedTab="search"/>
        </View>
    }


}


HomeSection.propTypes = {
    categories: PropTypes.array.isRequired,
    topSearches: PropTypes.array.isRequired,
    onFocusOnSearch: PropTypes.func.isRequired,
    isSearchingFocused: PropTypes.bool.isRequired,
    onBackButton: PropTypes.func.isRequired,
    onCategorySelected: PropTypes.func.isRequired,
};


var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'

    },
    tabHeader: {
        fontFamily: 'Raleway-Regular',
        marginTop: 9,
        borderBottomWidth: 0,
        fontSize: 16
    },
    scrollableTabView: {
        borderWidth: 0
    }

});
export default HomeSection