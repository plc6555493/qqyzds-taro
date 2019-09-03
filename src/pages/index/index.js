import Taro from '@tarojs/taro';
import { View, Text, Image, Swiper, SwiperItem } from '@tarojs/components';
import { AtAvatar, AtCurtain, AtButton } from 'taro-ui';

import './index.scss';
import MyLogin from '../../components/login';

import config from '../../config.json';

class Index extends Taro.Component {

    config = {
        navigationBarTitleText: '全球一站电商',
        enablePullDownRefresh: true
    };

    constructor(props) {
        super(props);
        this.state = {
            homeData: config.homeData,
            curSelect: 0,
            isOpened: false
        }
    }
    
    componentDidMount() {
        this.setState({isOpened: true});
    }

    onSelectTag(index) {
        this.setState({curSelect: index});
    }
    
    naviagteToTemplate(template) {
        if (template.type !== 'applet_template') {
            Taro.showToast({
                title:'暂未开放，敬请期待',
                icon:'none'
            });
            return
        }
        
        if ((template.childMenus || []).length > 0) {
            Taro.navigateTo({url: `/pages/template/list/index?templateList=${JSON.stringify(template.childMenus)}&title=${template.title}`});
            return
        }
        Taro.navigateTo({url: `/pages/template/detail/index?template=${JSON.stringify(template)}`});
    }
    
    naviagteToStore() {
        Taro.navigateTo({url: '/pages/store/index'});
    }
    
    onClose() {
        this.setState({isOpened: false});
    }
    
    onPullDownRefresh() {
        Taro.stopPullDownRefresh();
    }
    
    render() {
        const { homeData, curSelect, isOpened } = this.state;
        return (
            <View className='container'>
                <View className='index-atAvatar' onClick={this.naviagteToStore.bind(this)}>
                    <AtAvatar size='small' circle={true} openData={{type:'userAvatarUrl'}}/>
                </View>
                <View className='container1'>
                    <Swiper
                        className='top'
                        indicatorDots
                        indicatorActiveColor='#f5222d'
                        autoplay
                    >
                        {
                            homeData.top_swiper_img.map((item,index)=>{
                                return(
                                    <SwiperItem className='top-item' key={index}>
                                        <Image
                                            className='headPic'
                                            src={item}
                                        />
                                    </SwiperItem>
                                )
                            })
                        }
                    </Swiper>


                    <View　className='introduce'>
                        <View className='introduce_title'>{homeData.introduce.title}</View>
                        <View className='introduce_sub_title'>{homeData.introduce.sub_title}</View>
                        <View　className='line'/>
                        <View className='tabs'>
                            <View className='at-row at-row--wrap tabs_title'>
                                {
                                    homeData.introduce.tabs && homeData.introduce.tabs.map((item, index) => {
                                        return(
                                            <Text
                                                key={index}
                                                className={`tabs_title_tag ${curSelect === index ? 'selected' : 'unSelected'}`}
                                                onClick={this.onSelectTag.bind(this, index)}
                                            >
                                                {item.title}
                                            </Text>
                                        )
                                    })
                                }
    
                            </View>
                            <View className='tabs_menus'>
                                {
                                    homeData.introduce.tabs && homeData.introduce.tabs.map((item, index) => {
                                        return curSelect === index && (
                                            <View　key={index} className='at-row at-row--wrap tabs_menus_child'>
                                                {
                                                    item.menus && item.menus.map((item1, index1) => {
                                                        return(
                                                            <View className='at-row at-row__align--center at-row__justify--center tabs_pic'
                                                                  key={index1}
                                                                  style={{backgroundImage:`url(${item1.image})`}}
                                                                  onClick={this.naviagteToTemplate.bind(this, item1)}
                                                            >
                                                                <View className='at-row at-row__direction--column at-row__align--center at-row__justify--center txt-bg'>
                                                                    <Text>{item1.title}</Text>
                                                                    <Text>{item1.subTitle}</Text>
                                                                </View>

                                                            </View>
                                                        )
                                                    })
                                                }
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                    </View>
                    <View className='block'>
                        <Text className='underline-title'>互联网商业 成功三步</Text>
                        <View className='at-row at-row__justify--center at-row__align--center new-pay'>
                            <Image
                                className='pay-type'
                                mode='widthFix'
                                src='http://qiniu.258m.com/new-three-step.png'
                            />
                        </View>
                        <Image
                            className='main-pic'
                            src='http://qiniu.258m.com/pay-method.png'
                            mode="widthFix"
                        />
                    </View>
                    <View className='at-row at-row__justify--center'>
                        <Image
                            className='arrow'
                            src='http://qiniu.258m.com/arrow.png'
                        />
                    </View>
                    <View className='block'>
                        <Text className='underline-title'>新零售趋势：躺在家里购物</Text>
                        <Image
                            className='main-pic'
                            src='http://qiniu.258m.com/new-transition.png'
                            mode="widthFix"
                        />
                    </View>
                    <View className='success_case'>
                        <View className='at-row' style={{padding: '0 20rpx'}}>
                            {
                                homeData.success_case.list && homeData.success_case.list.map((item,index)=>{
                                    return(
                                        <Image className='success_case_pic' src={item.pic} key={index}/>
                                    )
                                })
                            }
                        </View>
                    </View>
                    <View className='company-introduce'>
                        <Image
                            className='ellipse'
                            mode="widthFix"
                            src='http://qiniu.258m.com/ellipse.png'
                        />
                        <View className='at-row at-row__direction--column at-row__justify--around article'>
                            <Text className='title'>世界之窗科技</Text>
                            <View className='at-row at-row__direction--column at-row__justify--between context'>
                                <View className='at-row at-row__align--start'>
                                    <View className='at-row at-row__align--center'>
                                        <View className='circle-img'>
                                            <Image
                                                className='circle'
                                                src='http://qiniu.258m.com/icon1.png'
                                            />
                                        </View>
                                        <Text className=''>云服务商：</Text>
                                    </View>
                                    <Text className='at-row' style={{width:'300px'}}>Hii-SAAS云服务商，电商2.0软件内核的商业应用软件，目前以小程序软件为主，提供国内唯一的全移动端技术；</Text>
                                </View>
                                <View className='at-row at-row__align--start'>
                                    <View className='at-row at-row__align--center'>
                                        <View className='circle-img'>
                                            <Image
                                                className='circle'
                                                src='http://qiniu.258m.com/icon3.png'
                                            />
                                        </View>
                                        <Text className=''>公司文化：</Text>
                                    </View>

                                    <Text className='at-row' style={{width:'300px'}}>推行国际化科技公司模式，线上团队、在线办公等，为每个成员开放更多的自由事业发展空间；</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View className='at-row at-row__direction--column at-row__justify--around at-row__align--center company-information'>
                        <View className='at-row at-row__align--center company-information-top'>
                            <View className='at-row at-row__justify--center top-left'>
                                <Image
                                    className='top-img'
                                    src='http://qiniu.258m.com/logo.png'
                                />
                            </View>
                            <View className='at-row at-row__direction--column at-row__justify--around top-right'>
                                <Text>联系我们：（0519）88292187</Text>
                                <Text>代理咨询：（0519）88292990</Text>
                                <Text>客服：公众号——全球一站电商</Text>
                            </View>
                        </View>

                        <View className='at-row at-row__direction--column at-row__justify--around company-information-bottom'>
                            <View className='at-row at-row__justify--around'>
                                <Text>常州世界之窗网络科技有限公司</Text>
                                <Text>社会信用代码：9132040481256038Q</Text>
                            </View>
                            <View className='at-row at-row__justify--around'>
                                <View className='at-row at-row__align--center'>
                                    <Image
                                        className='bottom-img'
                                        src='http://qiniu.258m.com/gh.png'
                                    />
                                    <Text>苏公网安备 33010602004358号</Text>
                                </View>
                                <Text>【国家工信部备案】 苏ICP备 16050461号</Text>
                            </View>
                        </View>
                    </View>
                </View>
    
                <AtCurtain
                    closeBtnPosition='top-right'
                    isOpened={isOpened}
                    onClose={this.onClose.bind(this)}
                >
                    <Image
                        mode='widthFix'
                        style={{width: '100%', borderRadius: '20rpx'}}
                        src={require('../../assets/images/advert.png')}
                    />
                </AtCurtain>
                <MyLogin />
            </View>
        )
    }
}

export default Index
