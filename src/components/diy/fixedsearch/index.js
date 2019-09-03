import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';

import EditButton from '../editButton';

class Index extends Taro.Component {
    static options = {
        addGlobalClass: true
    };
    
    static defaultProps = {
        diyitem: {}
    };
    
    handleEdit() {
    
    }
    
    render() {
        const { diyitem } = this.props;
        let params = diyitem.params || {};
        
        return(
            <View className='diy_edit'>
                <EditButton onEdit={this.handleEdit.bind(this)}/>
                <View class="diy-fixedsearch fixed">
                    <View class="background" style="background:{{diyitem.style.background}};opacity:{{diyitem.style.opacity}}"/>
                    <View class="inner">
                        {
                            params.leftnav > 0 && (
                                <View bindtap="navigate" class="leftnav" data-url="{{diyitem.params.leftnavlink}}">
                                    {
                                        params.leftnav === 1 && (
                                            <Text class="icox {{diyitem.params.leftnavicon}}" style="color:{{diyitem.style.leftnavcolor}}"/>
                                        )
                                    }
                                    {
                                        params.leftnav === 2 && (
                                            <Image src="{{diyitem.params.leftnavimg}}"/>
                                        )
                                    }
                                </View>
                            )
                        }
                        <View class="center {{diyitem.params.searchstyle}}">
                            <View style="background:{{diyitem.style.searchbackground}};color:{{diyitem.style.searchtextcolor}}">
                                {params.placeholder || ''}
                            </View>
                        </View>
                        {
                            params.rightnav > 0 && (
                                <View bindtap="navigate" class="rightnav" data-url="{{diyitem.params.rightnavlink}}">
                                    {
                                        params.rightnav == 1 && (
                                            <Text class="icox {{diyitem.params.rightnavicon}}" style="color:{{diyitem.style.rightnavcolor}}"/>
                                        )
                                    }
                                    {
                                        params.rightnav === 2 && (
                                            <Image src="{{diyitem.params.rightnavimg}}"/>
                                        )
                                    }
                                </View>
                            )
                        }
                    </View>
                </View>

            </View>
        )
    }
}

export default Index