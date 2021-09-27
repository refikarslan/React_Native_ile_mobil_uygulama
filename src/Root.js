import React, { Component } from 'react'
import { Text, View } from 'react-native'


import Form from './components/Form';
import Map from './components/Map';
import Edit from './components/Edit';
export default class Root extends Component {
    render() {
        return (
           <Router>
                <stack
                    key='Root'>
                    <stack
                        key='Form'
                        component={Form}
                        hideNavBar
                        initial
                    />
               

                      <stack 
                       key='Map'
                       component={Map}
                       hideNavBar
                          />

                      <stack 
                       key='Edit'
                       component={Edit}
                       hideNavBar
                          />
               

              </stack>

           </Router>

        
        )
    }
}
