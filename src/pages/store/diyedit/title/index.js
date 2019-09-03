import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import _ from 'utilscore/dist/index'
import './index.scss';
import {View, Text} from "@tarojs/components";
import {AtButton} from "taro-ui";
import {diy} from "../../../../apis";

class EditTitle extends Taro.Component {
    static config = {
        navigationBarTitleText: '标题栏',
    };

    constructor(props) {
        super(props);
        let diyItem = {};
        let diyItemKey = '';
        let diypage = props.diypage || {};
        let diyItems = diypage.items || {};

        let { diyitemid }= this.$router.params;
        diyItemKey = diyitemid;
        Object.keys(diyItems).map((key)=>{
            if(key===diyItemKey){
                diyItem = diyItems[key];
            }
        });
        let nowDiyItem = diyItem || [];
        let params = nowDiyItem.params || {};
        let title = params.title;
        let icon = params.icon;

        this.state = {
            diyItem: diyItem,
            diyItemKey: diyItemKey,
            title,
            icon,
            buttonColor:''
        }
    }

    changeText(e) {
        this.setState({
            title:e.detail.value
        })
    }

    clearIcon() {
        this.setState({icon:''})
    }

    changeIcon() {

    }

    save () {
        const { title, icon, diyItemKey, diyItem } = this.state;
        const { diypage } = this.props;
        diyItem.params = diyItem.params || {};
        diyItem.params = {
            title,
            icon
        };
        diypage.items[diyItemKey] = diyItem;
        diy.saveDiyPage(1,diypage);
    }

    render(){
        const { title } = this.state;
        return(
            <View className='index'>
                <View className='at-row at-row__justify--center at-row__align--center item'>
                    <Text
                        className='title'
                    >
                        标题文字
                    </Text>
                    <Input
                        className='text'
                        value={title}
                        onChange={this.changeText.bind(this)}
                    />
                    <Button
                        className='check-img'
                        onClick={this.changeIcon.bind(this)}
                    >
                        选择图标
                    </Button>
                    <Button
                        className='check-img btn-color'
                        onClick={this.clearIcon.bind(this)}
                    >
                        清除图标
                    </Button>
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

export default connect(mapStateToProps)(EditTitle)
