import React, { Component } from 'react';
import { Text, View, ImageBackground,Dimensions, Image,
TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-rouuter-flux';

import Button from '../commons/Button';
import {strings} from '../Lang/Strings';
import RNGooglePalces from'react-native-google-places';
import ImagePicker from('react-native-image-picker');


const {width, height} = Dimensions.get('window');

class Form extends Component {
    state={
        yourLocation:'',
        himLocation:'',
        yourimgOk: require('../img/ok.png'),
        himimgOk: require('../img/ok.png'),
        yourLongLat:[],
        himLongLat:[],
        myPhoto:'',
        himPhoto:''

    }

    componentWillMount() {
        this.setState({
            yourLocation:strings.location,
            himLocation: strings.himlocation,
        })

    } 

    renderSection(text,onPress,img){
        return(
             <View style = {Styles.section}>
            <TouchableOpacity
                 onPress={onPress}
                 style={{flex:1, justifyContent:
                    'space-between', flexDirection:'row',
                     alignItems:'center'}}>
        
               <Text style ={{ textAlign:'center',
               flex: 9 }} >{text}</Text>

                <image 
               source = {require(img)}
               />
       
           </TouchableOpacity>

         </View>
         );
    }
    showPhoto(type, text, onPress,){
        return(
            <TouchableOpacity
            onPress={onPress}
            >
                <Image
                source ={type ==='my' ? 
                this.state.myPhoto :
                this.state.himPhoto}
                style ={styles.photoStyle}
                />
                
        <Text style={styles.pickerTextStyle}>{text}</Text>
        </TouchableOpacity>           
        )
    }

    renderPickerButton(text,onPress){
        return(
            <TouchableOpacity
            onPress={onPress}
            >
   
            <View style={styles.pickerButtonStyle}>
             <image source = {require('../img/Add.png')}
             />
             </View>
        <Text style={styles.pickerTextStyle}>{text}</Text>
        </TouchableOpacity>
        );
    }  

    openSearchModaltype(){
        RNGooglePlaces.openAutocompleteModal()
        .then((place) => {
            console.log(place);
            if(type=='my'){
                this.setState({
                yourLocation:place.name,
                yourimgOk: require('../img/check.png'),
                yourLongLat:[place.latitude,
                    place.longitude]
                });
            }
            else{
                this.setState({
                himLocation:place.name,
                himimgOk: require('../img/check.png'),
                himLongLat:[place.latitude,
                    place.longitude]
            });
            }
            this.setState({yourLocation:place.name});
        })
        .catch(error => console.log(error.message));  // error is a Javascript Error object
    }
    openImagePicker(type){
      
        var options = {
            title:strings.title,
            storageOptions:{
                skipBackup:true,
                path:'images'
            },
            takePhotoButtonTitle:strings.takePhotoButtonTitle,
            chooseFromLibraryButtonTitle:strings.chooseFromLibraryButtonTitle,
            cancelButtonTitle:strings.cancelButtonTitle,
            maxwidth:500,
            maxheight:500,
            quality:0.5
        };

        ImagePickerIOS.showImagePicker(options, (response)=>{
            console.log('Response = ', response);

            if(response.didCancel){
                console.log('User cancelled imag');
            }
            else if(response.error){
                console.log('ImagePicker Error:',
                response.error);
            }
            else{
                let source = {uri:response.uri };

                if(type ==='my'){
                      this.setState({
                myPhoto: source
            });
               }
                 else{
                    this.setState({
                        myPhoto: source
                    });
                 }
           }
        });

    }

    render() {
        return (
            <ImageBackground 
             source={require('../img/bg.png')}
             style={{width,height, alignItems: 'center', 
             justifyContent:'center'}}
            >
             <image source = {require('../img/logo.png')}
             />

            {this.renderSection(
                this.state.yourLocation,
                ()=>this.openSearchModal('my'), 
                this.state.yourimgOk
                )}

            {this.renderSection(
                this.state.himLocation,
                ()=>this.openSearchModal('him'),
                this.state.himimgOk
                )}

            <View style={styles.PickerMainViewStyle}>
            {
                this.state.myPhoto !=='' ?
                this.showPhoto(
                    'my',
                    strings.yourPhoto,
                    ()=>this.openImagePicker('my')
                ):
            this.renderPickerButton(
                strings.yourPhoto,
                ()=>this.openImagePicker('my'))
                }

            {this.state.himPhoto !== '' ?
            this.showPhoto(
                'him',
                strings.himPhoto,
                ()=>this.openImagePicker('him')
            ):

            this.renderPickerButton(
                strings.himPhoto,
                ()=>this.openImagePicker('him'))
                }

            </View>


         <Button
         onPress={()=>Actions.Map({
             data:{
                  yourLongLat:this.state.yourLongLat,
             himLongLat:this.state.himLongLat,
             myPhoto:this.state.myPhoto,
                himPhoto:this.state.himPhoto
                }
               
            }) }
            text= {strings.buttontext}/>

            </ImageBackground>
            );
    }
}
const styles = {

    photoStyle:{
        width:width*0.24,
        height:height*0.24,
        borderRadius:(width*0.24) / 2,
    },
    pickerTextStyle:{
        marginTop:10,
        color:'white',
        width:width*0.24,
        textAlign:'center'
    },
    PickerMainViewStyle:{
        flexDirection:'row',
        marginTop:20,
        backgroundColor:'red',
        width:width*0.59,
        justifyContent:'space-between',
    },
    pickerButtonStyle : {
        width:width*0.24,
        height:height*0.24,
        borderRadius:(width*0.24) / 2,
        backgroundColor:'red',
        marginRight:20,
        alignItems:'center',
        justifyContent:'center'
    },
    section:{
         marginTop:10,
         backgroundColor:'wihite',
         borderRadius: 10,
         width:width*0.59,
         height:height*0.05,
         flexDirection:'row',
         alignItems:'center',
         justifyContent:'center',
         paddingLeft: 10,
         paddingRight:10
    }
};
export default Form;
