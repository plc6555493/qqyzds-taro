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
        let style = diyitem.style || {};
        let params = diyitem.params || {};
        
        return(
            <View>
                {/*<EditButton onEdit={this.handleEdit.bind(this)}/>*/}
                {
                    style.showtype !== 0 && (
                        <View class="fui-copyright-group">
                            {
                                params.showimg == 1 && (
                                    <Image src="{{diyitem.params.imgurl}}"/>
                                )
                            }
                            <Text
                                class="copyright_cover"
                                style="text-align:left; font-size: 24rpx; vertical-align: middle;max-width:530rpx;display:inline-block;"
                            >
                                {params.copyright || ''}
                            </Text>
                        </View>
                    )
                }
                {
                    style.showtype === 0 && (
                        <View class="fui-copyright2-group">
                            {
                                params.showimg == 1 && (
                                    <Image src="{{diyitem.params.imgurl}}" style="width: 60rpx;height: 60rpx;"/>
                                )
                            }
                            <Text class="copyright_cover" style="font-size: 24rpx;line-height: 60rpx;">{params.copyright || ''}</Text>
                        </View>
                    )
                }
            </View>
        )
    }
}

export default Index