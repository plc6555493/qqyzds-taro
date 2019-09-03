import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import _ from 'utilscore/dist/index';
import { View, Text, Image } from '@tarojs/components';
import { AtButton, AtInput   } from 'taro-ui';

import './index.scss';
import { diy } from '../../../../apis';
import {upload} from '../../../../service/request'

class EditMenu extends Taro.Component {

    static config = {
        navigationBarTitleText: '按钮组1',
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

        let imgurl = [];
        let text = [];
        ( diyItem.data || [] ).map((item,key) => {
            imgurl.push(item.imgurl);
            text.push(item.text)
        });

        this.state = {
            imgurl,
            text,
            diyItemKey,
            diyItem
        }
    }

    changeImg( key ) {
        Taro.chooseImage({
            count:1
        }).then(res=>{
            let {imgurl} = this.state;
            let arr = [];
            let data = {};
            (imgurl || []).map((item,index) =>{
                if(index==key){
                    data.filePath = res.tempFilePaths[0];
                    data.typeUpload = 'wx_album';
                }
            });
            return upload(data).then((res)=>{
                (imgurl || []).map((item,index) =>{
                    if(index==key){
                        arr.push(res.data.file_url_120);
                    } else {
                        arr.push(item)
                    }
                });
                this.setState({imgurl:arr})
            });
        });

    }

    changeText( key, e ) {
        let {text} = this.state;
        let arr = [];
        (text || []).map((item,index) => {
            if(index==key){
                arr.push(e)
            } else {
                arr.push(item)
            }
        });
        this.setState({text:arr})
    }

    save () {
        const { imgurl, text, diyItemKey, diyItem } = this.state;
        const { diypage } = this.props;
        diyItem.data = [];
        imgurl.map((item,index) => {
            diyItem.data.push({
                imgurl:item,
                linkurl:'',
                text:text[index],
                color:'#666666'
            })
        });
        diypage.items[diyItemKey] = diyItem;
        diy.saveDiyPage(1,diypage);
    }

    render() {
        const { imgurl, text } = this.state;
        return(
            <View>
                {
                    imgurl.map((item,key) => {
                        return(
                            <View key={key}
                                className='at-row at-row__justify--center at-row__align--center item'
                            >

                                <View className='img-out'>
                                    <Image
                                        className='img'
                                        src={item}
                                    />
                                    <View
                                        className='check-img'
                                        onClick={this.changeImg.bind(this,key)}
                                    >
                                        选择图片
                                    </View>
                                </View>
                                <View className='at-row at-row__direction--column at-row__justify--between'>
                                    <View className='at-row at-row__justify--around at-row__align--center'>
                                        <Text>
                                            按钮文字
                                        </Text>
                                        <AtInput
                                            className='input'
                                            type='text'
                                            value={text[key]}
                                            onChange={this.changeText.bind(this,key)}
                                        />
                                    </View>
                                    <View className='at-row at-row__justify--around at-row__align--center'>
                                        <Text>
                                            图片地址
                                        </Text>
                                        <AtInput
                                            className='input'
                                            type='text'
                                            value={item}
                                            editable={false}
                                        />
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

export default connect(mapStateToProps)(EditMenu)
