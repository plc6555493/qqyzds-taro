import React from 'react';
import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { bindActionCreators } from 'redux';
import { View, Text } from '@tarojs/components';

import './index.scss';
import Search from '../../../components/diy/search';
import Banner from '../../../components/diy/banner';
import Menu from '../../../components/diy/menu';
import Menu2 from '../../../components/diy/menu2';
import Title from '../../../components/diy/title';
import Goods from '../../../components/diy/goods';
import FixedSearch from '../../../components/diy/fixedsearch';
import Notice from '../../../components/diy/notice';
import Copyright from '../../../components/diy/copyright';
import ListMenu from '../../../components/diy/listmenu';
import Picture from '../../../components/diy/picture';
import Pictures from '../../../components/diy/pictures';
import Picturew from '../../../components/diy/picturew';
import Coupon from '../../../components/diy/coupon';
import IconGroup from '../../../components/diy/icongroup';
import Blank from '../../../components/diy/blank';
import Line from '../../../components/diy/line';
import Richtext from '../../../components/diy/richtext';
import Video1 from '../../../components/diy/video';
import Tabbar from '../../../components/diy/tabbar';

import _ from '../../../utils/lodash';
import { diy } from '../../../apis';
import { updateDiyPage } from '../../../reducers';

class Index extends Taro.Component {
    static config = {
        navigationBarTitleText: '店铺装饰',
    };
    
    constructor(props) {
        super(props);
        this.state = {
            diypageItems: [],
            keys: [],
            swiperheight: 0,
            result: {},
            cover: 0
        }
    }
    
    componentWillMount() {
        diy.getDiyPage().then((res) => {
            let items = [];
            let diypage = res.diypage || {};
            let diypageItems = diypage.items || {};
            let keys = Object.keys(diypageItems) || [];
            
            keys.map((key) => {
                items.push(diypageItems[key]);
            });
            
            this.setState({diypageItems: items, keys: keys});
            this.props.updateDiyPage(diypage);
        });
    
        Taro.getSystemInfo().then((res) => {
            this.setState({swiperheight: res.windowWidth / 1.7});
        });
    }
    
    imagesHeight(t) {
        const { result } = this.state;
        let a = t.detail.width, e = t.detail.height, i = t.target.dataset.type;
    
        Taro.getSystemInfo().then((t) => {
            result[i] = (t.windowWidth / a * e).toFixed(2);
            this.setState({result: result});
        });
    }

    startplay(t) {
        // let a = t.target.dataset.cover;
        // console.log(a);
        this.setState({
            // cover: a,
            cover: 1,
            // showvideo: !0
        });
        // this.videoContext = Taro.createVideoContext("Video"), this.videoContext.play();
    }

    render() {
        const { diypageItems, cover, keys, ...rest } = this.state;
        
        return(
            <View className='container'>
                {
                    diypageItems.map((item, index) => {
                        let diyitemid = keys[index];
                        let props = {...rest, diyitemid: diyitemid, imagesHeight: this.imagesHeight.bind(this), startplay: this.startplay.bind(this), cover };
                        return (
                            <View key={index}>
                                { item.id === 'fixedsearch' && (<FixedSearch diyitem={item}/>) }
                                { item.id === 'search' && (<Search diyitem={item}/>) }
                                { item.id === 'notice' && (<Notice diyitem={item} {...props}/>) }
                                { item.id === 'banner' && (<Banner diyitem={item} {...props}/>) }
                                { item.id === 'menu' && (<Menu diyitem={item} {...props}/>) }
                                { item.id === 'menu2' && (<Menu2 diyitem={item} {...props}/>) }
                                { item.id === 'title' && (<Title diyitem={item} {...props}/>) }
                                { item.id === 'goods' && (<Goods diyitem={item} {...props}/>) }
                                { item.id === 'copyright' && (<Copyright diyitem={item}/>) }
                                { item.id === 'listmenu' && (<ListMenu diyitem={item} {...props}/>) }
                                { item.id === 'picture' && (<Picture diyitem={item} {...props}/>) }
                                { item.id === 'pictures' && (<Pictures diyitem={item} {...props}/>) }
                                { item.id === 'picturew' && (<Picturew diyitem={item} {...props}/>) }
                                { item.id === 'coupon' && (<Coupon diyitem={item} {...props}/>) }
                                { item.id === 'icongroup' && (<IconGroup diyitem={item} {...props}/>) }
                                { item.id === 'blank' && (<Blank diyitem={item}/>) }
                                { item.id === 'line' && (<Line diyitem={item}/>) }
                                { item.id === 'richtext' && (<Richtext diyitem={item}/>) }
                                { item.id === 'video' && (<Video1 diyitem={item} {...props}/>) }
                                { item.id === 'tabbar' && (<Tabbar diyitem={item} {...props}/>) }
                            </View>
                        )
                    })
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({updateDiyPage}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Index)
