import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { Swiper, SwiperItem, View, Image } from "@tarojs/components";
import { AtButton, AtTabs, AtTabsPane } from "taro-ui";
import GetTemplate from '../../../components/gettemplate';

import './index.scss';

class TemplateDetail extends Taro.Component {
    constructor(props) {
        super(props);
        let params = this.$router.params || {};
        let template = JSON.parse(params.template || '[]');
        let tabList = [];
        template.images && template.images.map( (item,index) => {
            tabList.push({title:`模板${index+1}`})
        } );
        this.state = {
            template: template,
            current: 0, //当前模板序号
            tabList:tabList,
            isShow:false,
            template_id:''
        }
    }
    
    componentWillMount() {
        const { template } = this.state;
        Taro.setNavigationBarTitle({title: template.title || '应用模版'});
    }

    // changeCurrent ( e ) {
    //     this.setState({current:e.detail.current})
    // }

    checkTemplate () {
        const openid = Taro.getStorageSync('userinfo_openid');
        console.log(openid);
        Taro.request({
            url:'http://www.weiqing.com/api/api.php',
            data:{
                i:6,
                r:'MiniProgram.payment.unify',
                openid:openid,
                body:'模板套餐开通费',
                total_fee:1,
            },
            header:{'content-type':'application/x-www-form-urlencoded'},
            method:'POST'
        }).then((res)=>{
            console.log(res);
            Taro.requestPayment({
                nonceStr: res.data.nonceStr,
                package: res.data.package,
                paySign:res.data.paySign,
                signType:res.data.signType,
                timeStamp:JSON.stringify(res.data.timeStamp)
            }).then(res=>{
                console.log(res);
                Taro.showModal({
                    title:'是否有已注册的小程序',
                    content:'直接授权：有已注册的小程序，使用已注册的小程序前往授权；前往注册：没有已注册的小程序，快速注册小程序',
                    confirmText:'前往注册',
                    confirmColor:'#07C160',
                    cancelText:'直接授权',
                    cancelColor:'#f5222d'
                }).then(res=>{
                    if( res.cancel === true ) {
                        Taro.navigateTo({url:'/pages/store/auth/index'})
                    }
                    if( res.confirm === true ){
                        Taro.navigateTo({url:'/pages/store/register/index'})
                    }
                })

            },rej=>{
                console.log(rej);
            }).catch(res=>{
                console.log('error===',res);
            })

        })
    }




    checkTemplate1 () {
        Taro.showModal({
            title:'',
            content:'确认选择当前店铺模板',
            confirmText:'确认',
            confirmColor:'#07C160',
            cancelText:'取消',
            cancelColor:'#f5222d'
        }).then(res=>{
            if ( res.confirm === true ) {
                Taro.navigateTo({url:'/pages/store/index'}).then(()=>{
                    if( res.confirm === true ) {
                        Taro.showModal({
                            title:'是否已授权小程序',
                            content:'店铺管理：已授权，前往店铺管理；前往授权：未授权，前往授权',
                            confirmText:'前往授权',
                            confirmColor:'#07C160',
                            cancelText:'店铺管理',
                            cancelColor:'#f5222d'
                        }).then(res=>{
                            if( res.cancel === true ) {

                            }
                            if( res.confirm === true ){
                                Taro.showModal({
                                    title:'是否有已注册的小程序',
                                    content:'直接授权：有已注册的小程序，使用已注册的小程序前往授权；前往注册：没有已注册的小程序，快速注册小程序',
                                    confirmText:'前往注册',
                                    confirmColor:'#07C160',
                                    cancelText:'直接授权',
                                    cancelColor:'#f5222d'
                                }).then(res=>{
                                    if( res.cancel === true ) {
                                        Taro.navigateTo({url:'/pages/store/auth/index'})
                                    }
                                    if( res.confirm === true ){
                                        Taro.navigateTo({url:'/pages/store/register/index'})
                                    }
                                })
                            }
                        })
                    }
                })
            }
        });


        // Taro.navigateTo({url:'/pages/store/index'})
    }

    handleClick ( currentIndex ) {
        this.setState({current:currentIndex})
    }

    toBuy () {
        const { template } = this.state;
        this.setState({isShow:true,template_id:template.id})
    }

    closeBuy () {
        this.setState({isShow:false})
    }

    render() {
        const { template, tabList, isShow, template_id } = this.state;
        let images = template.images || [];
        return(
            <View className='container'>
                <View className='swiper_container'>
                    <AtTabs
                        current={this.state.current}
                        scroll
                        tabList={tabList}
                        onClick={this.handleClick.bind(this)}>
                        {
                            images.map( (item,index)=>{
                                return (
                                    <AtTabsPane current={this.state.current} index={index} key={index}>
                                        <View className='img-out'>
                                            <Image className='img' mode='widthFix' src={item.imgurl}/>
                                        </View>
                                    </AtTabsPane>
                                )
                            } )
                        }

                    </AtTabs>
                    {/*<Swiper*/}
                    {/*    className='_swiper'*/}
                    {/*    circular*/}
                    {/*    indicatorDots*/}
                    {/*    indicatorActiveColor='#f5222d'*/}
                    {/*    onChange={this.changeCurrent.bind(this)}*/}
                    {/*>*/}
                    {/*    {*/}
                    {/*        images.map((item, index) => {*/}
                    {/*            return(*/}
                    {/*                <SwiperItem className='_swiper-item' key={index}>*/}
                    {/*                    <View className='img-out'>*/}
                    {/*                        <Image className='img' mode='widthFix' src={item.imgurl}/>*/}
                    {/*                    </View>*/}
                    {/*                </SwiperItem>*/}
                    {/*            )*/}
                    {/*        })*/}
                    {/*    }*/}
                    {/*</Swiper>*/}
                </View>
                {/*<AtButton className='button' full onClick={this.checkTemplate.bind(this)}>*/}
                {/*    选择当前模板*/}
                {/*</AtButton>*/}
                {
                !isShow && (
                <View className='at-row fixed-bar'>
                    <Text className='at-col at-col-9 at-row at-row__justify--center at-row__align--center left'>
                        当前选择<Text style={{color:'#6190E8'}}>模板{this.state.current+1}</Text>
                    </Text>
                    <Text className='at-col at-col-3 at-row at-row__justify--center at-row__align--center right'
                          onClick={this.toBuy.bind(this)}
                    >
                        购买
                    </Text>
                </View>
                )}
                <GetTemplate
                    isShow={isShow}
                    template_id={template_id}
                    closeBuy={this.closeBuy.bind(this)}
                    getTemplate={this.checkTemplate.bind(this)}
                />
            </View>

        )
    }
}
/**<Purchase
    show={show}
    handleClosed={this.handleClosed.bind(this)}
    closeMask={this.closeMask.bind(this)}
/>
<Button onClick={this.onTest.bind(this)}>点击我</Button>

<View className='at-row fixed-bar'>
    <Text className='at-col at-col-9 at-row at-row__justify--center'>
        {data.fixedBar.title}
    </Text>
    <Text className='at-col at-col-3 at-row at-row__justify--center'
          onClick={this.handleOpened.bind(this)} >
        {data.fixedBar.buttonText}
    </Text>
</View>**/
const mapStateToProps = (state) => {
    return {
    }
};

export default connect(mapStateToProps)(TemplateDetail)
