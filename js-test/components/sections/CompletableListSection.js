/**
 * Created by xavier on 5/10/16.
 */
import React, {
    View,
    Text,
    PropTypes,
    ListView,
    StyleSheet,
    StatusBar,
    Animated,
    ScrollView
} from 'react-native'
import CompletableList from '../CompletableList'
import Header from '../Header'
import BottomBar from '../BottomBar'
import BackButton from '../BackButton'

class CompletableListSection extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillMount(){
        this.props.init()
    }

    render() {
        return <View style={styles.body}>
            <StatusBar
                backgroundColor="#202020"
                translucent={true}
                barStyle="light-content"
            />
            <View style={styles.searchContainer}>
                <View style={styles.canvasContainer}>
                    <Header title={this.props.type}/>
                    <View style={styles.backButton}>
                        <BackButton/>
                    </View>
                </View>
                <ScrollView scrollEventThrottle={200} contentInset={{top: 0}}
                            automaticallyAdjustContentInsets={false}>
                    <CompletableList type={this.props.type} listItems={this.props.listItems}
                                     onClickItem={this.props.onClickItem} onDeleteItem={this.props.onDeleteItem}/>

                </ScrollView>
                <View style={styles.bottomArea}>
                    <BottomBar type={this.props.type} onAddItem={this.props.onAddItem}/>
                </View>
            </View>
        </View>
    }


}


CompletableListSection.propTypes = {
    type: PropTypes.string.isRequired,
    listItems: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        completed: PropTypes.bool,
        name: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired
    })).isRequired,
    onClickItem: PropTypes.func.isRequired,
    onAddItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    init: PropTypes.func.isRequired
};


var styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch'
    },
    canvasContainer: {
        height: 100,
        justifyContent: 'center',
        backgroundColor: '#202020',
        alignSelf: 'stretch'
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#f3f3f3'
    },
    bottomArea: {
        height: 60,
        backgroundColor: '#202020'
    },
    backButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: 100,
        width: 60
    }
});
export default CompletableListSection