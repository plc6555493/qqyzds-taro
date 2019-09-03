import {
  Block,
  View,
  OpenData,
  Image,
  Text,
  Navigator,
  Button,
  ScrollView
} from '@tarojs/components'
import Taro from '@tarojs/taro'
export default class AdvertTmpl extends Taro.Component {
  render() {
    const { showMask } = this.props;
    
    return (
      <Block>
        {showMask && (
          <View className="mask" onClick={this.hideMask}>
            <View className="advert_container">
              <Image src="/image/advert.png" mode="widthFix">
                <Image className="close" src="/image/close.png" />
              </Image>
            </View>
          </View>
        )}
      </Block>
    )
  }

  static options = {
    addGlobalClass: true
  }
}
