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
    ScrollView,
    Dimensions,
    Image
} from 'react-native'
import HeaderBar from '../HeaderBar'
import ImageSlider from 'react-native-image-slider';
import Accordion from 'react-native-collapsible/Accordion';
import Minicard from '../Minicard'


let {width, height} = Dimensions.get('window');


class ProductSpecsSection extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {showSearch: false};
        this.state = {
            showFixed: true, howManyDays: this.props.howManyDays > 30 ? "30+ días" :
                this.props.howManyDays == 1 ? "1 día" : +this.props.howManyDays + " días"
        }
    }

    componentWillMount() {
    }

    render() {
        return <View style={styles.container}>
            <HeaderBar onBackPress={this.props.onBackPress} header={this.props.header}/>
            <ScrollView style={{marginTop: 3, paddingTop:38}}
                        scrollEventThrottle={20}
                        onScroll={(event)=>{
         console.log(event.nativeEvent.contentOffset.x);
         console.log(event.nativeEvent.contentOffset.y);
         if(event.nativeEvent.contentOffset.y>width-24)
             {
                this.setState({showFixed: false})
             }else{
                this.setState({showFixed: true})
             }
         }
     }>
                <ImageSlider height={width} images={this.props.images}/>
                <View style={{paddingHorizontal: 13, paddingTop: 18}}>
                    <Text style={styles.productName}>{this.props.productName}</Text>
                    <Text style={styles.productDescription}>{this.props.productDescription}</Text>
                </View>
                {this.state.showFixed ? null :
                    <View style={[styles.fixedHeader, {top: width-74, zIndex: 100, height: 50,}]}>
                        <Text style={styles.brandName}>{this.props.brandName}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{ fontFamily: 'icons',fontSize: 18, marginRight: 15}}>i</Text>
                            <Text style={{ fontFamily: 'icons',fontSize: 18, marginRight: 17}}>j</Text>
                        </View>

                    </View> }
                {this.state.showFixed ? null :
                    <Image source={{uri: this.props.brandImageUrl}}
                           style={[styles.brandImage, {top: width-62, zIndex: 100}]}/> }

                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <View style={styles.priceWrapper}>
                        {this.props.compareAtPrice ?
                            <Text style={styles.compareAtPrice}>${this.props.compareAtPrice}</Text> :
                            <Text />}
                        <Text style={[styles.price, {
                color:  '#fc582f'
                }]}>${this.props.price}</Text>

                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                        <Text style={{ fontFamily: 'icons',fontSize: 18, marginRight: 15}}>i</Text>
                        <Text style={{ fontFamily: 'icons',fontSize: 18, marginRight: 17}}>j</Text>
                    </View>
                </View>

                <Accordion
                    underlayColor="white"
                    sections={['More']}
                    renderHeader={()=><Text style={{fontFamily: 'icons', fontSize: 24, alignSelf: 'center', color: '#777'}}>k</Text>}
                    renderContent={()=>this.props.variants.map(variant=> {
                    return <View key={variant.name} style={{paddingHorizontal: 13, paddingVertical: 10}}>

                        <View style={{flexWrap: 'wrap',
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',}}>
                                    <Text style={[styles.productName,{lineHeight: 22, marginRight: 13, fontSize: 14,}]}>{variant.name}</Text>
                            {variant.values.map(value=> {
                                return <Text style={[styles.productName,{fontFamily: 'Raleway-Light', color: '#777',
                                   marginRight: 13, lineHeight: 22, fontSize: 14}]} key={value}>
                                    {value}</Text>
                            })}
                        </View>

                    </View>
                })}
                />
                <View style={{width:width, borderBottomWidth: 0.5, borderBottomColor: '#ddd', marginVertical: 20 }}/>
                <Text style={[styles.productName, {marginVertical: 10, alignSelf:'center', fontSize: 13}]}>PRODUCTOS SIMILARES</Text>
                <View style={{width:width, borderBottomWidth: 0.5, borderBottomColor: '#ddd', marginVertical: 20 }}/>

                <View style={styles.product}>
                    {this.props.products.map(product=><Minicard
                        key={product.id}
                        imageUrl={product.imageUrl}
                        brand={product.brand}
                        productName={product.productName}
                        price={product.price}
                        compareAtPrice={product.compareAtPrice}
                    />)}
                </View>

                <Text>Holaaaaaaaaaaaaaaaaaaaaa</Text>
                <Text>Holaaaaaaaaaaaaaaaaaaaaa</Text>
                <Text>Holaaaaaaaaaaaaaaaaaaaaa</Text>
                <Text>Holaaaaaaaaaaaaaaaaaaaaa</Text>
                <Text>Holaaaaaaaaaaaaaaaaaaaaa</Text>
                <Text>Holaaaaaaaaaaaaaaaaaaaaa</Text>
                <Text>Holaaaaaaaaaaaaaaaaaaaaa</Text>
                <Text>Holaaaaaaaaaaaaaaaaaaaaa</Text>
                <Text>Holaaaaaaaaaaaaaaaaaaaaa</Text>
                <Text>Holaaaaaaaaaaaaaaaaaaaaa</Text>
                <Text>Holaaaaaaaaaaaaaaaaaaaaa</Text>
                <Text>Holaaaaaaaaaaaaaaaaaaaaa</Text>
                <Text>Holaaaaaaaaaaaaaaaaaaaaa</Text>
                <Text>Holaaaaaaaaaaaaaaaaaaaaa</Text>
                <Text>Holaaaaaaaaaaaaaaaaaaaaa</Text>
                <Text>Holaaaaaaaaaaaaaaaaaaaaa</Text>
                <Text>Holaaaaaaaaaaaaaaaaaaaaa</Text>
                <Text>Holaaaaaaaaaaaaaaaaaaaaa</Text>
                <Text>Holaaaaaaaaaaaaaaaaaaaaa</Text>
                <Text>Holaaaaaaaaaaaaaaaaaaaaa</Text>
                <Text>Holaaaaaaaaaaaaaaaaaaaaa</Text>
                <Text>Holaaaaaaaaaaaaaaaaaaaaa</Text>
                <Text>Holaaaaaaaaaaaaaaaaaaaaa</Text>
                <Text>Holaaaaaaaaaaaaaaaaaaaaa</Text>

            </ScrollView>

            {this.state.showFixed ? <View style={styles.fixedHeader}>
                <Text style={styles.brandName}>{this.props.brandName}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{ fontFamily: 'icons',fontSize: 18, marginRight: 15}}>i</Text>
                    <Text style={{ fontFamily: 'icons',fontSize: 18, marginRight: 17}}>j</Text>
                </View>

            </View> : null}
            {this.state.showFixed ? <Image source={{uri: this.props.brandImageUrl}} style={styles.brandImage}/> : null}
        </View>
    }


}


ProductSpecsSection
    .propTypes = {
    onBackPress: PropTypes.func.isRequired,
    header: PropTypes.string.isRequired,
    brandImageUrl: PropTypes.string.isRequired,
    brandName: PropTypes.string.isRequired,
    howManyDays: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
    productDescription: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    compareAtPrice: PropTypes.string.isRequired,
    variants: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        values: PropTypes.arrayOf(PropTypes.string).isRequired,
    })),
    products: PropTypes.array.isRequired,


};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    fixedHeader: {
        height: 38,
        top: 79,
        backgroundColor: '#fff',
        position: 'absolute',
        opacity: 0.95,
        width: width,
        justifyContent: 'space-between',
        paddingLeft: 67,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: 6
    },
    brandImage: {
        height: 47,
        width: 47,
        top: 78,
        position: 'absolute',
        marginTop: 15,
        marginLeft: 13,
    },
    brandName: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 14
    },
    howManyDays: {
        fontFamily: 'Raleway-Light',
        fontSize: 14,
        color: '#999',
        marginRight: 13
    },
    productName: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 16
    },
    productDescription: {
        fontFamily: 'Raleway-Regular',
        fontSize: 14,
        marginTop: 5,
        textAlign: 'justify',
        lineHeight: 20
    },
    priceWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 13,
        paddingTop: 15
    },
    price: {
        fontFamily: 'Roboto-Light',
        color: '#fc582f',
        fontSize: 18,
    },
    compareAtPrice: {
        fontFamily: 'Roboto-Light',
        marginRight: 3,
        fontSize: 14,
        textDecorationLine: 'line-through',
        color: '#777'
    },
    product: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 10,
        alignItems: 'flex-start',

    },
});

export
default
ProductSpecsSection