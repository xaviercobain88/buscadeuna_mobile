import {connect} from 'react-redux'
import CompletableListSection from '../components/sections/CompletableListSection'
import {FindProjectsCmd, SelectProjectCmd, AddProjectCmd, DeleteProjectByIdCmd} from '../project/Commands'
import {Actions} from 'react-native-router-flux';

const mapStateToProps = (state) => {
    return {
        type: "Projects",
        listItems: Object.keys(state.projects).length === 0 && state.projects.constructor === Object ? [] : state.projects
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        onClickItem: id => ()=> dispatch(new SelectProjectCmd(id).toPlainJSON()),
        init: ()=>dispatch(new FindProjectsCmd().toPlainJSON()),
        onAddItem: text => ()=> dispatch(new AddProjectCmd(text).toPlainJSON()),
        onDeleteItem: id => ()=> dispatch(new DeleteProjectByIdCmd(id).toPlainJSON())
    }
};

const ProjectListScene = connect(
    mapStateToProps,
    mapDispatchToProps
)(CompletableListSection);

export default ProjectListScene