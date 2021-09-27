import React, { Component } from 'react'
import { Text, View,Dimensions, TouchableOpacity} from 'react-native'

const {width, height} = Dimensions.get('window');

class Button extends Component {
    render() {
        return (
            <TouchableOpacity style={{width: width*0.71,
                height:height*0.07,
                backgroundColor:'#53008C',
                marginTop:0,
                borderRadius:10,
                alignItems:'center',
                justifyContent:'center' }}
                onPress={() => this.props.onPress()}>

                    
                <Text style={{color:'white' }}>Yol haritası oluştur</Text> 
                </TouchableOpacity>
            );
    }
}

const styles = {
};
export default Button;

