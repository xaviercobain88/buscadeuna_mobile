/**
 * Created by xavier on 4/26/16.
 */

import React, {View, Text, PropTypes, ListView, StyleSheet} from 'react-native';


export default class ProjectList extends React.Component {


    constructor(props) {
        super(props);

    }

    static getProjectListDatasource(projectList) {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return ds.cloneWithRows(projectList)
    }

    onClickProject(id) {
        return ()=>this.props.onClickProject(id)
    }

    render() {
        return <ListView
            dataSource={ProjectList.getProjectListDatasource(this.props.projectList)}
            renderRow={(project) => <Project name={project.name} active={project.active} onClick={this.onClickProject(project.id)} />}
            // renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
        />
    }
}




const ProjectList = ({ projectList, onClickProject }) => {
    return (
        <ListView
            dataSource={ProjectList.getProjectListDatasource(this.props.projectList)}
            renderRow={(project) => <Project name={project.name} active={project.active} onClick={this.onClickProject(project.id)} />}
        />
    )
}


ProjectList.propTypes = {
    projectList: React.PropTypes.arrayOf(React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired,
        active: React.PropTypes.bool
    })).isRequired,
    onClickProject: PropTypes.func.isRequired
};



var styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: '#e6e6e6'
    }
});

export default ProjectList