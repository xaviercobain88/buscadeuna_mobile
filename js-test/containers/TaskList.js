import {connect} from 'react-redux'
import CompletableListSection from '../components/sections/CompletableListSection'
import {AddTaskCmd, ToggleTaskCmd, DeleteTaskByIdCmd} from '../task/Commands'
import {Actions} from 'react-native-router-flux';

const mapStateToProps = (state, ownProps) => {
    return {
        type: "Tasks",
        listItems: Object.keys(state.tasks).length === 0 && state.tasks.constructor === Object ? [] : state.tasks,
        projectId: state.selectedProjectId
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        onClickItem: id => ()=> dispatch(new ToggleTaskCmd(id).toPlainJSON()),
        init: ()=> {
        },
        onAddItem: (projectId:string)=>( name:string) => ()=> dispatch(new AddTaskCmd(projectId, name).toPlainJSON()),
        onDeleteItem: id => ()=> dispatch(new DeleteTaskByIdCmd(id).toPlainJSON())
    }
};

const mergeProps =(stateProps, dispatchProps, ownProps)=>{
    return {
        ...stateProps,
        ...dispatchProps,
        onAddItem: dispatchProps.onAddItem(stateProps.projectId)
    }
}

const ProjectListScene = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(CompletableListSection);

export default ProjectListScene