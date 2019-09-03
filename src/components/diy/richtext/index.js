import Taro from '@tarojs/taro';
import { RichText} from '@tarojs/components';

import EditButton from '../editButton';

class Index extends Taro.Component {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        diyitem: {}
    };

    render() {
        const { diyitem } = this.props;
        let data = diyitem.data || [];

        return(
            <RichText
                       nodes="{{diyitem.params.content}}"
                       style="background:{{diyitem.style.background}};padding:{{diyitem.style.padding==0?0:diyitem.style.padding+'rpx'}} {{diyitem.style.padding==0?0:diyitem.style.padding+'rpx'}};display:block"/>
        )
    }
}

export default Index