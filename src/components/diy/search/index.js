import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

class Index extends Taro.Component {
    static options = {
        addGlobalClass: true
    };
    
    static defaultProps = {
        diyitem: {}
    };
    
    render() {
        const { diyitem } = this.props;
        
        return(
            <View class="category-search">
                <View class="weui-flex">
                    <View class="weui-flex__item category-search-form">
                        <View class="flex-head-search" id="searchBar" style="background:{{diyitem.style.background}};padding:{{diyitem.style.paddingtop}}rpx {{diyitem.style.paddingleft}}rpx">
                            <View
                                class="weui-search-bar__form {{diyitem.style.searchstyle}}"
                                hoverClass="none"
                                style="background:{{diyitem.style.inputbackground}};color:{{diyitem.style.color}}"
                            >
                                <View class="weui-search-bar__box category-search-box">
                                    <View class="flex-icon-search">
                                        <Text class="icox icox-search" style="color:{{diyitem.style.iconcolor}}"/>
                                    </View>
                                    <View class="weui-search-bar__input flex-input" style="text-align:{{diyitem.style.textalign}}">
                                        {diyitem.params.placeholder}
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        )
    }
}

export default Index