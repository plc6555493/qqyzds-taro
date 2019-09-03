import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import _ from 'utilscore/dist/index';
import {View, Text, Image, Button} from '@tarojs/components';
import { AtButton } from 'taro-ui';

import './index.scss';
import { diy } from '../../../../apis';
import {upload} from "../../../../service/request";

class EditGoods extends Taro.Component {

    static config = {
        navigationBarTitleText: '商品组',
    };

    constructor(props){
        super(props);

        let diyItem = {};
        let diyItemKey = '';
        let diypage = props.diypage || {};
        let diyItems = diypage.items || {};
        let {diyitemid} = this.$router.params;

        diyItemKey = diyitemid;
        Object.keys(diyItems).map(key => {
            if(key===diyItemKey){
                diyItem = diyItems[key];
            }
        });

        let thumb = [];
        let price = [];
        let title = [];
        const { goodsscroll } = diyItem.params || '';
        const data_temp = diyItem.data_temp || [];
        ( (goodsscroll==1 ? data_temp[0] : diyItem.data )|| [] ).map((item,key) => {
            title.push(item.title);
            price.push(item.price);
            thumb.push(item.thumb);
        });

        this.state = {
            thumb,
            price,
            title,
            diyItemKey,
            diyItem
        }
    }

    //选择图片
    changeImg( key ) {
        Taro.chooseImage({
            count:1
        }).then(res=>{
            console.log(res);
            let {thumb} = this.state;
            let arr = [];
            let data = {};
            (thumb || []).map((item,index) =>{
                if(index==key){
                    data.filePath = res.tempFilePaths[0];
                    data.typeUpload = 'wx_album';
                }
            });
            console.log(data);
            return upload(data).then((res)=>{
                console.log(1000,res);
                (thumb || []).map((item,index) =>{
                    if(index==key){
                        arr.push(res.data.file_url_120);
                    } else {
                        arr.push(item)
                    }
                });
                this.setState({thumb:arr})
            });
        });
    }

    changeTitle( index, e ) {
        let {title} = this.state;
        let arr = [];
        (title || []).map((item,key) => {
            if(index==key) {
                arr.push(e.detail.value)
            } else {
                arr.push(item)
            }
        });
        this.setState({title:arr})
    }

    changePrice( index, e ) {
        let {price} = this.state;
        let arr = [];
        (price || []).map((item,key) => {
            if(index==key) {
                arr.push(e.detail.value)
            } else {
                arr.push(item)
            }
        });
        this.setState({price:arr})
    }
    
    save () {
        const { title, price, thumb, diyItemKey, diyItem } = this.state;
        const { diypage } = this.props;
        diyItem.data = diyItem.data || [];
        title.map((item,index) => {
            diyItem.data.title = item;
            diyItem.data.thumb = thumb[index];
            diyItem.data.price = price[index];
        });
        diypage.items[diyItemKey] = diyItem;
        diy.saveDiyPage(1,diypage);
    }

    render() {
        const { title, price, thumb } = this.state;
        return(
            <View>
                {
                    title && title.map((item,index) => {
                        return(
                            <View
                                className='at-row at-row__justify--around at-row__align--center list'
                                key={index}
                            >
                                <View className='img-border'>
                                    <Image
                                        className='img'
                                        src={thumb[index]}
                                    />
                                </View>
                                <View className='at-row at-row__direction--column at-row__justify--around at-row__align--center all-item'>
                                    <View className='at-row at-row__justify--around at-row__align--center item'>
                                        <Text>商品名称</Text>
                                        <Input
                                            value={item}
                                            onChange={this.changeTitle.bind(this,index)}
                                        />
                                    </View>
                                    <View className='at-row at-row__justify--around at-row__align--center item'>
                                        <Text>商品价格</Text>
                                        <Input
                                            value={price[index]}
                                            onChange={this.changePrice.bind(this,index)}
                                        />
                                    </View>
                                    <View className='at-row at-row__justify--center at-row__align--center item'>
                                        <Input
                                            value={thumb[index]}
                                            disabled
                                        />
                                        <Button className='change-img'
                                                onClick={this.changeImg.bind(this,index)}
                                        >
                                            选择图片
                                        </Button>
                                    </View>
                                </View>

                            </View>
                        )
                    })
                }
                <AtButton
                    className='save'
                    full
                    onClick={this.save.bind(this)}
                >
                    保存
                </AtButton>
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

export default connect(mapStateToProps)(EditGoods)
