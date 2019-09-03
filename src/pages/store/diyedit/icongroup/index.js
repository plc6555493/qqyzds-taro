import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import _ from 'utilscore/dist/index';
import { View, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';

import './index.scss';
import { diy } from '../../../../apis';

class EditIcongroup extends Taro.Component {

    static config = {
        navigationBarTitleText: '图标组',
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

        let iconclass = [];
        let text = [];
        ( diyItem.data || [] ).map((item,key) => {
            iconclass.push(item.iconclass);
            text.push(item.text);
        });

        this.state = {
            iconclass,
            text,
            diyItemKey,
            diyItem
        }
    }

    changeImg( index ) {

    }

    clearImg( index ) {
        let {iconclass} = this.state;
        (iconclass || []).map((item,key)=>{
            index == key ? iconclass[key]='' : iconclass[key]=item;
        });
        this.setState({iconclass})
    }

    changeText( index, e ) {
        let {text} = this.state;
        let arr = [];
        (text || []).map((item,key) => {
            if(index==key) {
                arr.push(e)
            } else {
                arr.push(item)
            }
        });
        this.setState({text:arr})
    }

    save () {
        const { iconclass, text, diyItemKey, diyItem } = this.state;
        const { diypage } = this.props;
        diyItem.data = [];
        iconclass.map((item,index) => {
            diyItem.data.push({
                iconclass:item,
                linkurl:'',
                text:text[index],
            })
        });
        diypage.items[diyItemKey] = diyItem;
        diy.saveDiyPage(1,diypage);
    }

    render() {
        const { iconclass, text } = this.state;
        return(
            <View className='index'>
                {
                    iconclass.map((item,index) => {
                        return(
                            <View key={index}
                                  className='at-row at-row__justify--center at-row__align--center item'
                            >
                                <Text
                                    className='title'
                                >
                                    按钮文字
                                </Text>
                                <Input
                                    className='text'
                                    value={text[index]}
                                    onChange={this.changeText.bind(this,index)}
                                />
                                <Button
                                    className='check-img'
                                    onClick={this.changeImg.bind(this,index)}
                                >
                                    选择图标
                                </Button>
                                <Button
                                    className='check-img btn-color'
                                    onClick={this.clearImg.bind(this,index)}
                                >
                                    清除图标
                                </Button>
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

export default connect(mapStateToProps)(EditIcongroup)
