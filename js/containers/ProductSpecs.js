import {connect} from 'react-redux'
import ProductSpecsSection from '../components/sections/ProductSpecsSection'
import {Actions} from 'react-native-router-flux';
import {Dimensions} from 'react-native'
import {IMAGE_PREFIX} from '../app/Constants'
let {width} = Dimensions.get('window');


const mapStateToProps = (state) => {

    let rawImages = [
        "https://res.cloudinary.com/buscadeuna/image/upload/v1472820085/title_1.jpg",
        "https://res.cloudinary.com/buscadeuna/image/upload/v1472820085/title_1.jpg",
        "https://res.cloudinary.com/buscadeuna/image/upload/v1472820085/title_1.jpg"
    ];

    let rawBrandImageUrl = "https://res.cloudinary.com/buscadeuna/image/upload/v1472820085/title_1.jpg";
    let rawBrandImageUrlParts = rawBrandImageUrl.substring(IMAGE_PREFIX.length, rawBrandImageUrl.length).split("/");
    let brandImageUrl = IMAGE_PREFIX + "w_47,h_47,c_fit/" + rawBrandImageUrlParts[1];


    console.log(rawBrandImageUrlParts)

    let images = rawImages.map(rawImage => {
        let parts = rawImage.substring(IMAGE_PREFIX.length, rawImage.length).split("/");

        return IMAGE_PREFIX + "w_" + width + ",h_" + width + ",c_fit/" + parts[1];
    });

    return {
        header: "Adidas",
        images: images,
        brandName: "Adidas",
        brandImageUrl: brandImageUrl,
        howManyDays: 12,
        productName: "Zapatos a lo bestia",
        productDescription: "Fun and femme lace cheeky undies. " +
        "Cut wide at the hip with mixed lace designs at the waistline " +
        "and lower hem. Finished with a ruched seam back seam and lined gusset.",
        price: 12,
        compareAtPrice: "14.5",
        optionLabel: "Marca/Color",
        variants: [{
            name: "Tallas",
            values: [
                "Small", "Medium", "Large"
            ]
        },
            {
                name: "Colores",
                values: [
                    "Amarillo", "Blanco", "Negro", "Amarillo1", "Blanco1", "Negr1"
                ]
            }
        ],
       products: []

    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        onBackPress: ()=>console.log("hey"),
    }
};

const ProductSpecs = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductSpecsSection);

export default ProductSpecs