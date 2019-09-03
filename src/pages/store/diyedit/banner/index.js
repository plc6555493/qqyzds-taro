import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import _ from 'utilscore/dist/index';
import { View, Text } from '@tarojs/components';
import { AtButton, AtImagePicker } from 'taro-ui';

import './index.scss';
import { diy } from '../../../../apis';

class EditBanner extends Taro.Component {
    
    static config = {
        navigationBarTitleText: '轮播图装饰',
    };
    
    constructor(props) {
        super(props);
        let id = 'banner';
        let diyItem = {};
        let diyItemKey = '';
        let diypage = props.diypage || {};
        let diyItems = diypage.items || {};

        Object.keys(diyItems).map((key) => {
            if (diyItems[key].id === id) {
                diyItemKey = key;
                diyItem = diyItems[key];
            }
        });


        let images = [];
        (diyItem.data || []).map((item) => {
            images.push({
                url: item.imgurl
            });
        });
        
        this.state = {
            diyItem: diyItem,
            diyItemKey: diyItemKey,
            images: images
        }
    }
    
    imageChange(files, operationType, number) {
        this.setState({images: files});
    }
    
    previewImage(index) {
        const { images } = this.state;
        let preImages = [];
        images.map((item) => {
            preImages.push(item.url);
        });
        Taro.previewImage({urls: preImages, current: preImages[index]});
    }
    
    //添加轮播图
    addBanner() {
        const { images } = this.state;
        
        Taro.chooseImage().then((res) => {
            diy.uploadBanner(res.tempFilePaths).then((res) => {
                (res || []).map((item) => {
                    images.push({url: item});
                });
                this.setState({images: images});
            });
        });
    }
    
    save() {
        const { images, diyItemKey, diyItem } = this.state;
        const { diypage } = this.props;
        
        images.map((item, index) => {
            diyItem.data = diyItem.data || [];
            diyItem.data[index] = {
                imgurl: item.url,
                linkurl: (diyItem.data[index] || {}).linkurl || ''
            }
        });
    
        diypage.items[diyItemKey] = diyItem;
        diy.saveDiyPage(1,diypage);
    }
    
    render() {
        const { diyItem, images } = this.state;
        
        return(
            <View className='container'>
                <View className='scroll_view'>
                    <AtImagePicker
                        length={2}
                        files={images}
                        showAddBtn={false}
                        onChange={this.imageChange.bind(this)}
                        onImageClick={this.previewImage.bind(this)}
                    />
                </View>
                <View className='bottom at-row'>
                    <View className='at-col'>
                        <AtButton
                            full
                            className='add'
                            onClick={this.addBanner.bind(this)}
                        >
                            添加轮播图
                        </AtButton>
                    </View>
                    <View className='at-col'>
                        <AtButton
                            full
                            onClick={this.save.bind(this)}
                        >
                            保存
                        </AtButton>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    let store = state.store || {};
    return {
        diypage: _.deepClone(store.diypage || {})
    }
};

export default connect(mapStateToProps)(EditBanner)
