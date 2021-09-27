import React, {Component} from 'react';
import{View, Text,Dimensions, ImageBackground} from 'react-native';
import Draggable from 'react-native-draggable';

const {width, height} = Dimensions.get('window');

class Edit extends Component{
    componentWillMount(){
        console.log(this.props.data);

    }
    render(){
        return(
            <ImageBackground
            source ={{uri: this.props.data.uri}}
            style={{
                width,
                height
            }}
            >

            </ImageBackground>
        );
    }
}

export default Edit;