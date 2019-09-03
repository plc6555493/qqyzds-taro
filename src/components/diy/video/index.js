import Taro from '@tarojs/taro';
import { View, Video, Image, CoverImage} from '@tarojs/components';

import EditButton from '../editButton';

class Index extends Taro.Component {
    static options = {
        addGlobalClass: true
    };

    static defaultProps = {
        diyitem: {}
    };



    render() {
        const { diyitem, diyitemid, cover, startplay } = this.props;
        const play ='http://qiniu.258m.com/video_play.png';
        const voice ='http://qiniu.258m.com/voice.png';
        const mute ='http://qiniu.258m.com/mute.png';
        let sound =true;
        let data = diyitem.data || [];
        // console.log(123,cover,diyitemid);
        return(
            <View>
                {
                    cover==0? (
                        <View className="video_cover"
                              style="height:{{diyitem.style.ratio==0?375/8*9:''}}{{diyitem.style.ratio==1?parseInt(screenWidth)/2*3:''}}{{diyitem.style.ratio==2?screenWidth*2:''}}rpx;"
                        >
                            <Image className="bg" src="{{diyitem.params.poster}}" style="height:100%;width:100%" onClick={startplay} />
                            <Image className="play" data-cover="{{diyitemid}}" onClick={startplay} src={play} style=""/>
                        </View>
                    ):(
                        <Video
                            controls
                            bindpause = "bindpause"
                            id = "Video"
                            muted = "{{soundpic}}"
                            showMuteBtn = "{{true}}"
                            src = {diyitem.params.videourl}
                            style = "height:{{diyitem.style.ratio==0?screenWidth/8*9:''}}{{diyitem.style.ratio==1?screenWidth/2*3:''}}{{diyitem.style.ratio==2?screenWidth*2:''}}rpx;width:100%"
                        >
                            <CoverImage
                                bindtap = "changevoice"
                                className = "voice"
                                src = {sound?voice:mute} />
                        </Video>
                    )
                }
            </View>
        )
    }
}

export default Index