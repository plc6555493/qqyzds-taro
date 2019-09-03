import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import _ from 'utilscore/dist/index';
import { View, Text, Image } from '@tarojs/components';
import { AtButton } from 'taro-ui';

import './index.scss';
import close from '../../../../image/close.png'
import { diy } from '../../../../apis';
import {upload} from '../../../../service/request'

class EditNotice extends Taro.Component {
    static config = {
        navigationBarTitleText: '公告',
    };

    constructor(props){
        super(props);
        console.log(props);
        let id = 'notice';
        let diyItem = {};
        let diyItemKey = '';
        let diypage = props.diypage || {};
        let diyItems = diypage.items || {};

        Object.keys(diyItems).map((key) => {
            if(diyItems[key].id === id) {
                diyItemKey = key;
                diyItem = diyItems[key];
            }
        });
        let title = [];
        ( diyItem.data || [] ).map((item,key) => {
            title.push(item.title);
        });

        let { iconurl, noticedata, noticenum } = diyItem.params || '';
        this.state = {
            title,
            iconurl,
            noticedata,
            noticenum,
            diyItemKey,
            diyItem
        }
    }

    //选择公告图片
    checkPic() {
        Taro.chooseImage({count:1}).then((res) => {
            let data = {};
            data.filePath = res.tempFilePaths[0] || '';
            data.typeUpload = 'wx_album';
            upload(data).then(
                res=>{
                    this.setState({iconurl:res.data.file_url_120});
                }
            )
        })
    }

    //选择公告类型
    checkType(e) {
        if(e.detail.value == '1') {
            this.setState({noticedata:0})
        } else {
            this.setState({noticedata:1})
        }
    }

    //选择商城公告数量
    checkNum(e) {
        let {noticenum} = this.state;
        switch (e.detail.value) {
            case '1':
                noticenum = 5;
                break;
            case '2':
                noticenum = 10;
                break;
            default:
                noticenum = 20;
        }
        this.setState({noticenum})
    }

    //更改公告文字
    changeTitle(index,e) {
        let {title} = this.state;
        let arr = [];
        (title || []).map((item,key) => {
            if(key == index) {
                arr.push(e.detail.value)
            } else {
                arr.push(item)
            }
        });
        this.setState({title:arr})
    }

    //添加公告
    addTitle() {
        let {title} = this.state;
        title.push('');
        this.setState({title});
    }

    //删除公告
    deleteTitle(index) {
        let {title} = this.state;
        title.splice(index,1);
        this.setState({title})
    }

    //保存
    save(){
        const { title, iconurl, noticedata, noticenum, diyItemKey, diyItem } = this.state;
        const { diypage } = this.props;
        diyItem.data = title || [];
        diyItem.params = diyItem.params || {};
        diyItem.params.iconurl = iconurl || '';
        diyItem.params.noticedata = noticedata || '';
        diyItem.params.noticenum = noticenum || '';
        diypage.items[diyItemKey] = diyItem;
        diy.saveDiyPage(1,diypage);
    }

    render() {
        const { title, iconurl, noticedata, noticenum } = this.state;
        return(
            <View className='index'>
                <View className='at-row  at-row__direction--column at-row__justify--between notice-pic'>
                    <View className='at-row at-row__justify--center at-row__align--center'>
                        <Text className='text-notice-pic'>公告图标</Text>
                        <Input className='input-notice-pic' disabled value={iconurl}/>
                        <Text
                            className='button-notice-pic'
                            onClick={this.checkPic.bind(this)}
                        >
                            选择图片
                        </Text>
                    </View>
                    <View className='at-row at-row__justify--start at-row__align--center preview-pic'>
                        <Text>图片预览</Text>
                        <View className='pic-border'>
                            <Image
                                className='pic'
                                src={iconurl}
                            />
                        </View>
                    </View>
                </View>

                <View >
                    <View className='at-row at-row__justify--around at-row__align--center'>
                        <Text>公告内容</Text>
                        <RadioGroup
                            className='at-row at-row__justify--around'
                            onChange={this.checkType.bind(this)}
                        >
                            <Label for='1' key='1'>
                                <Radio
                                    className='radio-left'
                                    value='1'
                                    checked={noticedata == 0?true:false}
                                >
                                    读取商城公告
                                </Radio>
                            </Label>
                            <Label for='2' key='2'>
                                <Radio
                                    value='2'
                                    checked={noticedata == 1?true:false}
                                >
                                    手动填写
                                </Radio>
                            </Label>
                        </RadioGroup>
                    </View>

                    {
                        noticedata == 0 ? (
                            <View className='at-row at-row__justify--around at-row__align--center notice-num'>
                                <Text className='notice-num-title'>读取数量</Text>
                                <RadioGroup
                                    className='at-row at-row__justify--around notice-num-radioGroup'
                                    onChange={this.checkNum.bind(this)}
                                >
                                    <Label for='1' key='1'>
                                        <Radio value='1' checked={noticenum == 5?true:false}>5条</Radio>
                                    </Label>
                                    <Label for='2' key='2'>
                                        <Radio value='2' checked={noticenum == 10?true:false}>10条</Radio>
                                    </Label>
                                    <Label for='3' key='3'>
                                        <Radio value='3' checked={noticenum == 20?true:false}>20条</Radio>
                                    </Label>
                                </RadioGroup>
                            </View>
                        ) : (
                            <View className='all-title'>
                                {
                                    title && title.map((item,index) => {
                                        return(
                                            <View
                                                className='at-row at-row__justify--around at-row__align--center title'
                                                key={index}
                                            >
                                                <Text>标题</Text>
                                                <Input
                                                    value={item!==''?item:'请输入内容'}
                                                    onChange={this.changeTitle.bind(this,index)}
                                                />
                                                <Image
                                                    className='close'
                                                    src={close}
                                                    onClick={this.deleteTitle.bind(this,index)}
                                                />
                                            </View>
                                        )
                                    })
                                }
                                <AtButton
                                    className='addTitle'
                                    onClick={this.addTitle.bind(this)}
                                >
                                    ╋ 添加一个
                                </AtButton>
                            </View>
                        )
                    }

                </View>
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

export default connect(mapStateToProps)(EditNotice)
