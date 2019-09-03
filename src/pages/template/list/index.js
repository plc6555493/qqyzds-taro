import Taro from '@tarojs/taro';
import { View, Text, Image, ScrollView } from "@tarojs/components";

import './index.scss';

class TemplateList extends Taro.Component{
    
    constructor(props){
        super(props);
        let params = this.$router.params || {};
        let templateList = JSON.parse(params.templateList || '[]');
        let title = params.title || '模板列表';
        this.state = {
            templateList: templateList,
            title: title
        }
    }

    componentWillMount() {
        const { title } = this.state;
        Taro.setNavigationBarTitle({title: title});
    }
    
    navigateToTemplate(template) {
        Taro.navigateTo({url: `/pages/template/detail/index?template=${JSON.stringify(template)}`});
    }

    render() {
        const { templateList } = this.state;
        return(
            <View className='container'>
                <ScrollView>
                    {
                        templateList.map((item, index) => {
                            return(
                                <View key={index}
                                      className='at-row at-row__justify--center at-row__align--center list'
                                      onClick={this.navigateToTemplate.bind(this, item)}
                                >
                                    <Image className='img' src={item.image}/>
                                    <View className='at-row at-row__direction--column at-row__justify--center at-row__align--center right'>
                                        <Text>{item.title}</Text>
                                        <Button className='to-template' plain >
                                            立即获取
                                        </Button>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    }
}


export default TemplateList
