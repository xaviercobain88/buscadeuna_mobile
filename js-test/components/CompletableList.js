/**
 * Created by xavier on 5/10/16.
 */
import React, {
    View,
    Text,
    PropTypes,
    ListView,
    StyleSheet
} from 'react-native'
import ListItem from './ListItem'


const listToDataSource = function (listItems) {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(listItems)
}

const CompletableList = ({type, listItems, onClickItem, onDeleteItem}) => (
    <View>
        <ListView enableEmptySections={true}
            dataSource={listToDataSource(listItems)}
            renderRow={(item) => <ListItem type={type} status={item.status} name={item.name} completed={item.completed} id={item.id}
            onClick={onClickItem(item.id)} onDelete={onDeleteItem(item.id)} />}
        />
    </View>
);

CompletableList.propTypes = {
    listItems: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        completed: PropTypes.bool,
        name: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired
    })).isRequired,
    type: PropTypes.string.isRequired,
    onClickItem: PropTypes.func.isRequired,
    onDeleteItem:PropTypes.func.isRequired
}

export default CompletableList