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
    TouchableOpacity,
    TextInput,
    Image
} from 'react-native'
import HeaderBar from '../HeaderBar'
import Menu, {MenuContext, MenuOptions, MenuOption, MenuTrigger} from 'react-native-menu';

const CATEGORY = "CATEGORY";
const BRAND = "BRAND";
const PRICE = "PRICE";


class RefineSection extends React.Component {
    constructor(props) {
        super(props);
        let state = this._getState();
        state.selectedFilterType = this.props.selectedFilterType;
        this.state = state;
        this._removeCategory0 = this._removeCategory0.bind(this);
        this._removeCategory1 = this._removeCategory1.bind(this);
        this._removeCategory2 = this._removeCategory2.bind(this);
        this._getState = this._getState.bind(this);
        this._onPressBrand = this._onPressBrand.bind(this);
        this._resetSelectedPriceFrom = this._resetSelectedPriceFrom.bind(this);
        this._setSelectedPriceFrom = this._setSelectedPriceFrom.bind(this);
        this._resetSelectedPriceTo = this._resetSelectedPriceTo.bind(this);
        this._setSelectedPriceTo = this._setSelectedPriceTo.bind(this)

    }

    _resetSelectedPriceFrom() {
        this.setState({selectedPriceFrom: null});
        setTimeout(()=>this._selectedPriceFrom.setNativeProps({text: ''}), 10)
    }

    _setSelectedPriceFrom(selectedPriceFrom) {

        this.setState({selectedPriceFrom: selectedPriceFrom});
    }

    _resetSelectedPriceTo() {
        this.setState({selectedPriceTo: null});
        setTimeout(()=>this._selectedPriceTo.setNativeProps({text: ''}), 10)
    }

    _setSelectedPriceTo(selectedPriceTo) {

        this.setState({selectedPriceTo: selectedPriceTo});
    }

    componentDidMount() {

    }

    _getBrandSelectedIcon() {
        return this.state.selectedBrands && this.state.selectedBrands.length > 0 ?
            <View style={styles.selectedIcon}/> : null
    }

    _getCategorySelectedIcon() {
        return this.state.selectedCategory1 ?
            <View style={styles.selectedIcon}/> : null
    }

    _getPriceSelectedIcon() {
        return this.state.selectedPriceFrom || this.state.selectedPriceTo
        // || this.state.selectedPriceRanges && this.state.selectedPriceRanges.length > 0
        || this.state.selectedOnSale ?
            <View style={styles.selectedIcon}/> : null
    }

    _removeCategory0() {
        if (this.state.selectedCategory1) {
            this.setState({
                selectedCategory1: null,
                selectedCategory2: null,
                selectedCategory3: null
            })
        } else {
            this.setState({selectedCategory0: null})
        }
    }

    _removeCategory1() {
        if (this.state.selectedCategory2) {
            this.setState({
                selectedCategory2: null,
                selectedCategory3: null
            })
        } else {
            this.setState({selectedCategory1: null})
        }
    }

    _getState() {
        return {
            selectedCategory0: this.props.selectedCategory0,
            selectedCategory1: this.props.selectedCategory1,
            selectedCategory2: this.props.selectedCategory2,
            selectedCategory3: this.props.selectedCategory3,
            selectedBrands: [...this.props.selectedBrands],
            selectedPriceFrom: this.props.selectedPriceFrom,
            selectedPriceTo: this.props.selectedPriceTo,
            selectedOnSale: this.props.selectedOnSale,
            brandSearch: ""
        }
    }

    _resetFilters() {
        this.setState(this._getState())
    }

    _removeCategory2() {
        this.setState({
            selectedCategory2: null,
            selectedCategory3: null
        })
    }

    _getSelectedCategories() {
        let options = [];
        if (this.state.selectedCategory0) {
            options.push(<View style={styles.filterItemWrapper} key="selectedCategory0">
                <Text style={styles.filterItemText}>{this.state.selectedCategory0.toUpperCase()}</Text>
                <TouchableOpacity onPress={this._removeCategory0}><Text
                    style={styles.removeIcon}>r</Text></TouchableOpacity>
            </View>);
        }
        if (this.state.selectedCategory1) {
            options.push(<View style={styles.filterItemWrapper} key="selectedCategory1">
                <Text style={styles.filterItemText}>{this.state.selectedCategory1}</Text>
                <TouchableOpacity onPress={this._removeCategory1}><Text
                    style={styles.removeIcon}>r</Text></TouchableOpacity>
            </View>);
        }
        if (this.state.selectedCategory2) {
            options.push(<View style={styles.filterItemWrapper} key="selectedCategory2">
                <Text style={styles.filterItemText}>{this.state.selectedCategory2}</Text>
                <TouchableOpacity onPress={this._removeCategory2}><Text
                    style={styles.removeIcon}>r</Text></TouchableOpacity>
            </View>);
        }

        return options;
    }


    _getCategoriesForSelection() {

        let categories = this.props.categories;
        let categoriesForSelectingKey = "selectedCategory0";

        if (this.state.selectedCategory0) {
            let category = categories.find(category=>category.name == this.state.selectedCategory0);
            categories = category ? category.children : [];
            categoriesForSelectingKey = "selectedCategory1";
        }
        if (this.state.selectedCategory1) {
            let category = categories.find(category=>category.name == this.state.selectedCategory1);
            categories = category ? category.children : [];
            categoriesForSelectingKey = "selectedCategory2";
        }
        if (this.state.selectedCategory2) {
            let category = categories.find(category=>category.name == this.state.selectedCategory2);
            categories = category ? category.children : [];
            categoriesForSelectingKey = "selectedCategory3";
        }


        return <ScrollView style={{backgroundColor: '#F8F8F8', flex: 1}}>
            {categories.map(category=><TouchableOpacity key={category.name}
                                                        style={styles.categoryForSelectionWrapper}
                                                        onPress={()=>this.setState({[categoriesForSelectingKey]: category.name})}>
                {console.log(category.name)}
                <Text style={[styles.categoryForSelection,
             {color: category.name==this.state.selectedCategory3?'#3F72EA':'#333',
             fontFamily: category.name==this.state.selectedCategory3?'Raleway-SemiBold':'Raleway-Light',
             }
             ]}>{category.name}</Text>
            </TouchableOpacity>)}
        </ScrollView>

    }

    _getFilterContent() {
        if (this.state.selectedFilterType == CATEGORY) {
            return <View style={{flex: 1}}>
                {this._getSelectedCategories() }
                {this._getCategoriesForSelection()}
            </View>
        }
        if (this.state.selectedFilterType == BRAND) {
            return <View style={{flex: 1, flexDirection: 'column'}}><View style={styles.searchContainer}>
                <View style={styles.inputTextContainer}>
                    <Text style={styles.searchIcon}>s</Text>
                    <TextInput style={styles.searchInputText}
                               placeholder={"Buscar"}
                               placeholderTextColor="#999"
                               onChangeText={(brandSearch) => this.setState({brandSearch})}
                               value={this.state.brandSearch}
                    />
                </View>
                <View style={styles.separator}/>

            </View>
                <ScrollView >{this._getBrands()}</ScrollView></View>
        }
        if (this.state.selectedFilterType == PRICE) {
            return this._getPriceRanges()
        }

    }

    _onPressBrand(brand) {
        return ()=> {
            let brandItem = this.state.selectedBrands.find(selectedBrand => selectedBrand == brand.name);
            let brands = this.state.selectedBrands;
            if (brandItem) {

                brands = brands.filter(selectedBrand => selectedBrand !== brand.name)

            } else {
                brands.push(brand.name);
            }
            this.setState({selectedBrands: brands});
        }
    }

    _onPressPriceRange(selectedPriceRange) {
        return ()=> {
            let priceRangeItem = this.state.selectedPriceRanges.find(priceRange =>
            priceRange.priceFrom == selectedPriceRange.priceFrom && priceRange.priceTo == selectedPriceRange.priceTo);
            let priceRanges = this.state.selectedPriceRanges;
            if (priceRangeItem) {

                priceRanges = priceRanges.filter(priceRange =>
                priceRange.priceFrom != selectedPriceRange.priceFrom && priceRange.priceTo != selectedPriceRange.priceTo)

            } else {
                priceRanges.push(selectedPriceRange);
            }
            this.setState({selectedPriceRanges: priceRanges});
        }
    }

    _getBrands() {

        console.log(this.props.brands)
        return this.props.brands
            .filter(brand=>brand.name.toLowerCase().indexOf(this.state.brandSearch.toLowerCase()) !== -1)
            .map(brand=> {
                let isSelectedBrand = this.state.selectedBrands.find(selectedBrand => selectedBrand == brand.name);
                console.log(brand.name);
                return <TouchableOpacity key={brand.name} onPress={this._onPressBrand(brand)}>
                    <View style={styles.selectableItemWrapper}>
                        <View style={{
                flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'
            }}>
                            <Image source={{uri: brand.imageUrl}} style={{
                height: 25, width: 25, alignSelf: 'stretch', marginRight: 12}}/>
                            <Text style={styles.selectableItemText(isSelectedBrand)}>{brand.name}</Text>
                        </View>
                        <Text
                            style={styles.selectableItemIcon(isSelectedBrand)}>f</Text>
                    </View>
                </TouchableOpacity>
            })
    }

    _getPriceRangeLabel(priceRange) {
        return '$' + priceRange.priceFrom + ' - ' + '$' + priceRange.priceTo;
    }

    _getPriceRanges() {


        let priceRanges = [];
        /*this.props.priceRanges
         .map(priceRange=> {
         let isSelected = this.state.selectedPriceRanges.find(selectedPriceRange =>
         selectedPriceRange.priceFrom == priceRange.priceFrom && selectedPriceRange.priceTo == priceRange.priceTo);
         let label = this._getPriceRangeLabel(priceRange);
         return <TouchableOpacity key={label} onPress={this._onPressPriceRange(priceRange)}>
         <View style={styles.selectableItemWrapper}>

         <Text style={[styles.selectableItemText(isSelected),
         {fontFamily: isSelected ? 'Roboto-Medium' : 'Roboto-Regular'}]}>{label}</Text>
         <Text
         style={styles.selectableItemIcon(isSelected)}>f</Text>
         </View>
         </TouchableOpacity>
         });*/

        return <View><TouchableOpacity
            onPress={()=>this.setState({selectedOnSale:!this.state.selectedOnSale})}>
            <View style={styles.selectableItemWrapper}>

                <Text style={[styles.selectableItemText(this.state.selectedOnSale),
                {color:this.state.selectedOnSale?'#3F72EA': '#fc582f'} ]}>{this.props.onSaleLabel}</Text>
                <Text
                    style={[styles.selectableItemIcon(this.state.selectedOnSale),
                    {color:this.state.selectedOnSale?'#3F72EA': '#eee'}]}>f</Text>
            </View>
        </TouchableOpacity>
            <View style={styles.selectableItemWrapper}>

                <Text style={[styles.selectableItemText(false),
                {color:'#333', width: 70} ]}>Desde:</Text>
                <TextInput ref={component => this._selectedPriceFrom = component}
                           style={styles.searchInputText}
                           placeholder={"$"+this.props.minPrice.toString()}
                           placeholderTextColor="#999"
                           onChangeText={this._setSelectedPriceFrom}
                           value={this.state.selectedPriceFrom}/>
                <TouchableOpacity onPress={this._resetSelectedPriceFrom}>
                    <Text
                        style={[styles.selectableItemIcon(this.state.selectedPriceFrom),
                    {fontSize: 16 }]}>r</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.selectableItemWrapper}>


                <Text style={[styles.selectableItemText(false),
                {color:'#333', width: 70}]}>Hasta:</Text>
                <TextInput ref={component => this._selectedPriceTo = component}
                           style={styles.searchInputText}
                           placeholder={"$"+this.props.maxPrice.toString()}
                           placeholderTextColor="#999"
                           onChangeText={this._setSelectedPriceTo}
                           value={this.state.selectedPriceTo}/>
                <TouchableOpacity onPress={this._resetSelectedPriceTo}>
                    <Text
                        style={[styles.selectableItemIcon(this.state.selectedPriceTo),
                    {fontSize: 16}]}>r</Text>
                </TouchableOpacity>
            </View>
        </View>
    }


    render() {
        let isCategoryTabSelected = this.state.selectedFilterType == CATEGORY;
        let isPriceTabSelected = this.state.selectedFilterType == PRICE;
        let isBrandTabSelected = this.state.selectedFilterType == BRAND;
        return <View style={styles.container}>
            <HeaderBar onBackPress={this.props.onBackPress}
                       header="FILTRAR"
                       rightOption="RESETEAR"
                       onRightOptionPress={()=>this.setState(this._getState())}/>
            <View style={styles.filtersWrapper}>
                <View style={styles.filterTypesContainer}>
                    <TouchableOpacity onPress={()=>this.setState({selectedFilterType: CATEGORY})}>
                        <View style={[styles.filterTypesItemContainer,
                    isCategoryTabSelected?styles.filterTypesItemContainerSelected:{}]}>
                            {this._getCategorySelectedIcon()}
                            <Text
                                style={isCategoryTabSelected?styles.filterTypeSelected:styles.filterType}>CATEGORÍA</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.setState({selectedFilterType: PRICE})}>
                        <View style={[styles.filterTypesItemContainer,
                    isPriceTabSelected?styles.filterTypesItemContainerSelected:{}]}>
                            {this._getPriceSelectedIcon()}
                            <Text style={isPriceTabSelected?styles.filterTypeSelected:styles.filterType}>PRECIO</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.setState({selectedFilterType: BRAND})}>
                        <View style={[styles.filterTypesItemContainer,
                    isBrandTabSelected?styles.filterTypesItemContainerSelected:{}]}>
                            {this._getBrandSelectedIcon()}
                            <Text style={isBrandTabSelected?styles.filterTypeSelected:styles.filterType}>MARCAS</Text>
                        </View>
                    </TouchableOpacity>

                </View>
                <View style={{flexDirection: 'column', flex: 1}}>
                    {this._getFilterContent()}
                </View>

            </View>
            <View style={styles.searchButtonWrapper}>

                <TouchableOpacity onPress={this.props.onShowResultsPress(
                             this.state.selectedCategory0,
                             this.state.selectedCategory1,
                             this.state.selectedCategory2,
                             this.state.selectedCategory3,
                             this.state.selectedBrands,
                             this.state.selectedPriceFrom,
                             this.state.selectedPriceTo,
                             "")}>
                    <View
                        style={{padding: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: '#3F72EA',
                        borderRadius: 5,}}>
                        <Text
                            style={{fontFamily: 'Raleway-SemiBold', color: '#fff', fontSize: 15}}>MOSTRAR RESULTADOS</Text>
                    </View>

                </TouchableOpacity>
            </View>
        </View>
    }
}


RefineSection
    .propTypes = {
    onBackPress: PropTypes.func.isRequired,
    selectedCategory0: PropTypes.string,
    selectedCategory1: PropTypes.string,
    selectedCategory2: PropTypes.string,
    selectedCategory3: PropTypes.string,
    brands: PropTypes.array.isRequired,
    selectedBrands: PropTypes.array.isRequired,
    selectedPriceFrom: PropTypes.number,
    selectedPriceTo: PropTypes.number,
    selectedFilterType: PropTypes.string.isRequired,
    fts: PropTypes.string,
    categories: PropTypes.array.isRequired,
    selectedOnSale: PropTypes.bool.isRequired,
    onSaleLabel: PropTypes.string.isRequired,
    onShowResultsPress: PropTypes.func.isRequired,
    minPrice: PropTypes.number.isRequired,
    maxPrice: PropTypes.number.isRequired,


};

var styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    filtersWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flex: 1,
        marginTop: 2
    },
    filterTypesContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#eee',
        width: 115,
    },
    filterTypesItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingVertical: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eee',


    },
    filterTypesItemContainerSelected: {
        backgroundColor: '#fff',
    },
    filterType: {
        fontFamily: 'Raleway-Light',
        fontSize: 12,
        color: '#333',

    },
    filterTypeSelected: {
        fontFamily: 'Raleway-SemiBold',
        fontSize: 12,
        color: '#000',
    },
    selectedIcon: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: '#3F72EA',
        marginRight: 4
    },
    filterItemWrapper: {
        paddingLeft: 12,
        paddingRight: 9,
        paddingVertical: 11,
        height: 45,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eee',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    filterItemText: {
        fontFamily: 'Raleway-SemiBold',
        color: '#3F72EA',
        fontSize: 16
    },
    removeIcon: {
        fontFamily: 'icons',
        color: '#3F72EA',
        fontSize: 17
    },
    categoryForSelection: {
        fontFamily: 'Raleway-Light',
        color: "#333",
        fontSize: 16
    },
    categoryForSelectionWrapper: {
        marginLeft: 12,
        paddingRight: 9,
        paddingVertical: 11,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        height: 45,
    },
    searchButtonWrapper: {
        padding: 15,
        borderTopWidth: 0.5,
        borderTopColor: '#eee'
    },
    inputTextContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 25,
        marginTop: 10

    },
    searchIcon: {
        fontFamily: 'icons',
        fontSize: 12,
        color: '#999',
        marginTop: 2,
        marginRight: 12
    },
    searchInputText: {
        fontSize: 18,
        flex: 1,
        fontFamily: 'Raleway-Regular',
    },
    searchContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
        marginBottom: 10
    },

    selectableItemWrapper: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8,
        borderBottomWidth: 0.5, paddingHorizontal: 12,
        borderBottomColor: '#eee',
        height: 45,
    },
    selectableItemText: (selected)=> {
        return {
            fontFamily: selected ? 'Raleway-SemiBold' : 'Raleway-Light',
            color: selected ? '#3F72EA' : "#333",
            fontSize: 16
        }
    },
    selectableItemIcon: (selected)=> {
        return {fontFamily: 'icons', color: selected ? '#3F72EA' : "#eee", fontSize: 13}
    },
    separator: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    }
};

export default RefineSection