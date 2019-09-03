import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import _ from 'utilscore/dist/index';
import {View, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';

import './index.scss';
import { diy } from '../../../../apis';

class EditCoupon extends Taro.Component {

    static config = {
        navigationBarTitleText: '优惠券',
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

        let name = [];
        let price = [];
        let desc = [];
        ( diyItem.data || [] ).map((item,key) => {
            desc.push(item.desc);
            price.push(item.price);
            name.push(item.name);
        });

        this.state = {
            desc,
            price,
            name,
            diyItemKey,
            diyItem
        }
    }

    changeName( index, e ) {
        let {name} = this.state;
        let arr = [];
        (name || []).map((item,key) => {
            if(index==key) {
                arr.push(e.detail.value)
            } else {
                arr.push(item)
            }
        });
        this.setState({name:arr})
    }

    changeDesc( index, e ) {
        let {desc} = this.state;
        let arr = [];
        (desc || []).map((item,key) => {
            if(index==key) {
                arr.push(e.detail.value)
            } else {
                arr.push(item)
            }
        });
        this.setState({desc:arr})
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
        const { desc, price, name, diyItemKey, diyItem } = this.state;
        const { diypage } = this.props;
        diyItem.data = diyItem.data || [];
        desc.map((item,index) => {
            diyItem.data.desc = item;
            diyItem.data.name = name[index];
            diyItem.data.price = price[index];
        });
        diypage.items[diyItemKey] = diyItem;
        diy.saveDiyPage(1,diypage);
    }

    render() {
        const { desc, price, name } = this.state;
        return(
            <View>
                {
                    name && name.map((item,index) => {
                        return(
                            <View
                                className='at-row at-row__direction--column at-row__justify--around at-row__align--center list'
                                key={index}
                            >
                                <View className='at-row at-row__justify--between at-row__align--center'>
                                    <Text>优惠券名称</Text>
                                    <Input
                                        className='txt'
                                        value={item}
                                        onChage={this.changeName.bind(this,index)}
                                    />
                                </View>
                                <View className='at-row at-row__justify--between at-row__align--center'>
                                    <Text>使用条件</Text>
                                    <Input
                                        className='txt'
                                        value={desc[index]}
                                        onChage={this.changeDesc.bind(this,index)}
                                    />
                                </View>
                                <View className='at-row at-row__justify--between at-row__align--center'>
                                    <Text>优惠价格</Text>
                                    <Input
                                        className='txt'
                                        value={price[index]}
                                        onChage={this.changePrice.bind(this,index)}
                                    />
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

export default connect(mapStateToProps)(EditCoupon)
