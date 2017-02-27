/**
 * Created by Dennis on 13/5/16.
 */

import React, {
    View,
    PropTypes,
    StyleSheet
} from 'react-native';

export default class LoadingBar extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            percent: this.props.wt/100,
            step: 1,
            loaderW: 0,
            loaderTime: null
        }
    }

    componentWillMount(){
        var element = this;
        this.setState({
            loaderTime:  setInterval(function(){
                if(element.state.step > 95){
                    element.setState({
                        step: 0
                    });
                }
                else{
                    var newStep = element.state.step+1;
                    var newPercent = element.state.percent*newStep;
                    element.setState({
                        step: newStep,
                        loaderW: newPercent
                    });
                }
            },5)
        });
    }

    componentWillUnmount(){
        console.log('murio');
        clearInterval(this.state.loaderTime);
    }

    render() {
        return (
            <View style={[styles.loader, {width: this.props.wt, height: this.props.ht}]}>
                <View style={[styles.bg, {width: this.props.wt, height: this.props.ht}]}/>
                <View style={[styles.progress, {width: this.state.loaderW}]}/>
            </View>
        );
    }
}
LoadingBar.propTypes = {
    wt: PropTypes.number.isRequired,
    ht: PropTypes.number.isRequired
};


var styles = StyleSheet.create({
    loader: {
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: 5,
    },
    bg: {
        backgroundColor: '#66cac7',
        opacity: .2
    },
    progress: {
        backgroundColor: '#66cac7',
        position: 'absolute',
        left: 0,
        height: 4,
        bottom:0,
        borderBottomLeftRadius: 5
    }
});