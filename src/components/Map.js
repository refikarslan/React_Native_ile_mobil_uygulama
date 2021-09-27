import React, {Component} from 'react';
import{View, Text, StyleSheet,Dimensions, TouchableOpacity, ActionSheetIOS, TouchableNativeFeedback} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MapView from ;
import MapViewDirections from 'react-native-maps-directions';
import Form from './Form';

const {width, height} = Dimensions.get('window');
class Map extends Component{
    state = {
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
    }
    componentWillMount(){
        console.log(this.props.data);
        const{yourLongLet} = this.props.data;

        this.setState({
            region:{
                latitude:yourLongLet[0],
                longitude: yourLongLet[1],
                latitudeDelta: 5,
                longitudeDelta:5,

            },
            isButtonShow:true
        })
    }
    screenShot(){
        this.setState({
            isButtonShow: false
        });

        setTimeout(() =>{
            captureScreen({
            format: "jpg",
            quality: 0.8
              })
             .then(
             uri => {
                 console.log("Image saved to", uri);
                ActionSheetIOS.Compare({
                    data:{
                    uri, 
                    myPhoto: this.props.data.myPhoto,
                    himPhoto: this.props.data.himPhoto}
                    }
                   );
                },
             error => console.error("Oops, snapshot failed", error)
            );
          }, 500);

    }



    render(){
        const{yourLongLat, himLongLat} =
        this.props.data;

        const origin = {latitude: yourLongLat[0],
             longitude: yourLongLat[1]};

        const destination = {latitude: himLongLat[0],
             longitude: himLongLat[1]};

        const GOOGLE_MAPS_APIKEY = 'AIzaSyCAnrfdEvodNEmeylqxYQDbP-LqhVA19ws';

        return(


            <View style={{flex:1, justifyContent: 'flex-end',alignItems:'flex-end'}}>
           
             <MapView
             style={{...StyleSheet.absoluteFillObject}}
             region={this.state.region}>
                 <Marker coordinate ={origin} />
                    
            
                 <Marker coordinate ={destination} />
                
 
             <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={6}
              strokeColor="#f76c67"
              />    
             </MapView>
             
             {this.state.isButtonShow ?
             <TouchableOpacity
             style={{width:80,
                height:80,
                alignItems:'center',
                justifyContent:'center'}}
                 onPress ={()=> console.log('clic')}>
            


             <Image source={require ('../img/button.png')}
             style={styles.buttonStyle} />
             </TouchableOpacity> :
             null}

            </View>
        );
    }
}

const styles = {

    buttonStyle:{
        
        marginTop: height - 80,
        marginLeft:width - 80,
    }
};

export default Map;
