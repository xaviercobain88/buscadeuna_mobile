import {connect} from 'react-redux'
import SplashSection from '../components/sections/SplashSection'
import {Actions} from 'react-native-router-flux';
import {FindFiltersCmd} from '../filter/Commands'

const mapStateToProps = (state) => {
    return {
        
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        init: ()=>dispatch(new FindFiltersCmd().toPlainJSON())
        // init: ()=> console.log("holitas")
    }
};

const Splash = connect(
    mapStateToProps,
    mapDispatchToProps
)(SplashSection);

export default Splash