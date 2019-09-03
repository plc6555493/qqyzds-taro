import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import _ from 'utilscore/dist/index';
import {View, Text, Image, Button} from '@tarojs/components';
import { AtButton } from 'taro-ui';

import './index.scss';
import { diy } from '../../../../apis';
import {upload} from "../../../../service/request";

class EditPictures extends Taro.Component {

    static config = {
        navigationBarTitleText: '图片组',
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

        let title = [];
        let text = [];
        let imgurl = [];
        ( diyItem.data || [] ).map((item,key) => {
            imgurl.push(item.imgurl);
            text.push(item.text);
            title.push(item.title);
        });

        this.state = {
            imgurl,
            text,
            title,
            diyItemKey,
            diyItem
        }
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

    changeText( index, e ) {
        let {text} = this.state;
        let arr = [];
        (text || []).map((item,key) => {
            if(index==key) {
                arr.push(e.detail.value)
            } else {
                arr.push(item)
            }
        });
        this.setState({text:arr})
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
        const { imgurl, text, title, diyItemKey, diyItem } = this.state;
        const { diypage } = this.props;
        diyItem.data = [];
        imgurl.map((item,index) => {
            diyItem.data.push({
                imgurl:item,
                linkurl:'',
                title:title[index],
                text:text[index],
            })
        });
        diypage.items[diyItemKey] = diyItem;
        diy.saveDiyPage(1,diypage);
    }

    render() {
        const { imgurl, text, title } = this.state;
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
                                        src={imgurl[index]}
                                    />
                                </View>
                                <View className='at-row at-row__direction--column at-row__justify--around at-row__align--center all-item'>
                                    <View className='at-row at-row__justify--around at-row__align--center item'>
                                        <Text>上标题</Text>
                                        <Input
                                            value={item}
                                            onChange={this.changeTitle.bind(this,index)}
                                        />
                                    </View>
                                    <View className='at-row at-row__justify--around at-row__align--center item'>
                                        <Text>下标题</Text>
                                        <Input
                                            value={text[index]}
                                            onChange={this.changeText.bind(this,index)}
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

export default connect(mapStateToProps)(EditPictures)
