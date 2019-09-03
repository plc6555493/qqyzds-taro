import Taro from '@tarojs/taro';
import { View, Block } from '@tarojs/components';

import EditButton from '../editButton';

class Index extends Taro.Component {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        diyitem: {}
    };

    handleEdit() {
        let {diyitemid} = this.props;
        Taro.navigateTo({url: '/pages/store/diyedit/tabbar/index?diyitemid='+diyitemid});
    }

    render() {
        const { diyitem } = this.props;
        console.log(111,diyitem);
        return(
            <View className='diy_edit'>
                <EditButton onEdit={this.handleEdit.bind(this)}/>

                {
                    diyitem.id === 'tabbar' && diyitem.style.showtype == '1' && (
                        <View className="fui-tabbar style1">

                            {
                                diyitem.data.map( (items,index) => {
                                    return (

                                        <Block key = {index}>
                                            {
                                               ( diyitem.status === undefined || diyitem.status === '' || !diyitem.status) && (
                                                    <View className="item" data-id="{{diyitemid}}" data-type="{{index}}"
                                                          data-url="{{items.linkurl}}"
                                                          style="{{diyitem.data.length<=4?'flex: 1;':'flex-shrink:0;'}}{{index==0?'color:'+diyitem.style.activecolor+';background:'+diyitem.style.activebackground+';border-color:'+diyitem.style.activecolor:'color:'+diyitem.style.color+';background:'+diyitem.style.background}}">
                                                        {items.text || '选项'}
                                                    </View>
                                                )
                                            }
                                            {
                                                diyitem.status && (
                                                    <View className="item" data-id="{{diyitemid}}" data-type="{{index}}"
                                                          data-url="{{items.linkurl}}"
                                                          style="{{diyitem.data.length<=4?'flex: 1;':'flex-shrink:0;'}}{{diyitem.status==index?'color:'+diyitem.style.activecolor+';background:'+diyitem.style.activebackground+';border-color:'+diyitem.style.activecolor:'color:'+diyitem.style.color+';background:'+diyitem.style.background}}">
                                                        {items.text || '选项'}
                                                    </View>
                                                )
                                            }
                                        </Block>

                                    )
                                } )
                            }

                        </View>
                    )
                }

                {
                    diyitem.id === 'tabbar' && diyitem.style.showtype == '2' && (
                        <View className="fui-tabbar style2">
                            {
                                diyitem.data.map( (items,index) => {
                                    return (

                                        <Block key = {index}>
                                            {
                                                (diyitem.status === undefined || diyitem.status === '' || !diyitem.status) && (
                                                    <View className="item" data-id="{{diyitemid}}" data-type="{{index}}"
                                                          data-url="{{items.linkurl}}"
                                                          style="{{diyitem.data.length<=4?'flex: 1;':'flex-shrink:0;'}}{{index==0?'color:'+diyitem.style.activecolor+';background:'+diyitem.style.activebackground+';border-color:'+diyitem.style.activecolor:'color:'+diyitem.style.color+';background:'+diyitem.style.background}}">
                                                        {items.text || '选项'}
                                                    </View>
                                                )
                                            }
                                            {
                                                diyitem.status && (
                                                    <View className="item" data-id="{{diyitemid}}" data-type="{{index}}"
                                                          data-url="{{items.linkurl}}"
                                                          style="{{diyitem.data.length<=4?'flex: 1;':'flex-shrink:0;'}}{{diyitem.status==index?'color:'+diyitem.style.activecolor+';background:'+diyitem.style.activebackground+';border-color:'+diyitem.style.activecolor:'color:'+diyitem.style.color+';background:'+diyitem.style.background}}">
                                                        {items.text || '选项'}
                                                    </View>
                                                )
                                            }
                                        </Block>

                                    )
                                } )
                            }
                        </View>
                    )
                }

                {
                    diyitem.data.map( (items,index) => {
                        return (
                            <Block key={index}>
                                {
                                    diyitem.status==''||diyitem.status==undefined ? (
                                        <View>
                                            {
                                                index == 0 && (
                                                    <include src="/pages/diy/template/tpl_tabbarlist.wxml"></include>
                                                )
                                            }
                                        </View>
                                    ) : (
                                        <View>
                                            {
                                                diyitem.status==index && (
                                                    <include src="/pages/diy/template/tpl_tabbarlist.wxml"></include>
                                                )
                                            }
                                        </View>
                                    )
                                }
                            </Block>
                        )
                    } )
                }

            </View>
        )
    }
}

export default Index
