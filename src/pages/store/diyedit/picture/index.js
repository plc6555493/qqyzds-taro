import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import _ from 'utilscore/dist/index';
import {View, Image, Button} from '@tarojs/components';
import { AtButton } from 'taro-ui';

import './index.scss';
import { diy } from '../../../../apis';
import {upload} from "../../../../service/request";

class EditPicture extends Taro.Component {

    static config = {
        navigationBarTitleText: '单图组',
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
        ( diyItem.data || [] ).map((item,key) => {
            imgurl.push(item.imgurl);
        });

        this.state = {
            imgurl,
            diyItemKey,
            diyItem
        }
    }

    //选择图片
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

    save () {
        const { imgurl, diyItemKey, diyItem } = this.state;
        const { diypage } = this.props;
        diyItem.data = [];
        imgurl.map((item,index) => {
            diyItem.data.push({
                imgurl:item,
                linkurl:''
            })
        });
        diypage.items[diyItemKey] = diyItem;
        diy.saveDiyPage(1,diypage);
    }

    render() {
        const { imgurl } = this.state;
        return(
            <View>
                {
                    imgurl && imgurl.map((item,index) => {
                        return(
                            <View
                                className='at-row at-row__justify--around at-row__align--center list'
                                key={index}
                            >
                                <View className='img-border'>
                                    <Image
                                        className='img'
                                        src={item}
                                    />
                                </View>
                                <View className='at-row at-row__justify--center at-row__align--center item'>
                                    <Input
                                        value={imgurl[index]}
                                        disabled
                                    />
                                    <Button className='change-img'
                                            onClick={this.changeImg.bind(this,index)}
                                    >
                                        选择图片
                                    </Button>
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

export default connect(mapStateToProps)(EditPicture)
