import Taro from '@tarojs/taro';
import { connect } from '@tarojs/redux';
import { View, Image, Button } from '@tarojs/components';
import { AtNoticebar } from 'taro-ui';

import './index.scss';
const request = require('../../../utils/request.js')

class HeadImage extends Taro.Component {
    static config = {
        navigationBarTitleText: '修改头像'
    }
    
    constructor(props) {
        super(props);
        let head_image_url = props.store.imgUrl || ''
        this.state = {
            head_image_url: head_image_url, //头像信息
            modify_used_count: 0, //本月修改次数
            modify_quota: 0, //本月限制次数
            disabled: false,
            media_id: ''
        }
    }
    
    componentWillMount() {
        //let headImageInfo = JSON.parse(options.head_image_info || '{}')
        //let modify_quota = headImageInfo.modify_quota || 0
        //let modify_used_count = headImageInfo.modify_used_count || 0
        //this.setData({
        //    head_image_url: headImageInfo.head_image_url || '',
        //    modify_quota: modify_quota,
        //    modify_used_count: modify_used_count,
        //    disabled: modify_used_count >= modify_quota ? true : false
        //})
    }
    
    previewHeadImage() {
        const { head_image_url, disabled } = this.state;
        if (disabled) {
            Taro.previewImage({urls: [head_image_url]})
            return
        }
        
        this.uploadHeadImage()
    }
    
    uploadHeadImage() {
        Taro.showActionSheet({
            itemList: ['本地上传']
        }).then((res) => {
            if (res.tapIndex == 0) {
                Taro.chooseImage({}).then((res) => {
                    let tempFilePaths = res.tempFilePaths
                    let token = request.getStorage('token')
    
                    request.loadding('上传中...')
    
                    this.setData({ head_image_url: tempFilePaths[0] })
    
                    Taro.uploadFile({
                        url: request.url + 'fastRegisterWeappUploadMediaTemp',
                        filePath: tempFilePaths[0],
                        name: 'media',
                        formData: {
                            type: 'media',
                            media: tempFilePaths[0],
                            token: token
                        }
                    }).then(() => {
                        const data = JSON.parse(res.data)
                        request.msg(data.msg)
                        if (data.state) {
                            this.setData({
                                media_id: data.data.media_id
                            })
                        }
                    });
                }).catch(() => {
                    Taro.hideLoading()
                })
            }
        });
    }
    
    modifyHeadImage() {
        let { media_id, modify_used_count, modify_quota } = this.state;
        let modify_rest = modify_quota - modify_used_count
        
        if (modify_quota && modify_used_count >= modify_quota) {
            Taro.showToast({
                title: '本月修改次数已使用完毕，无法再次修改',
                icon: 'none'
            })
            return
        }
        
        if (!media_id) {
            Taro.showToast({
                title: '请上传需要修改的头像',
                icon: 'none'
            })
            return
        }
        
        Taro.showModal({
            title: '提示',
            content: `本月剩余修改次数${modify_rest}次，确认是否执行此次修改`,
            success: res => {
                if (res.confirm) {
                    request.request(
                        'fastRegisterWeappModifyHeadImage',
                        {
                            head_img_media_id: media_id
                        },
                        res => {
                            Taro.showToast({
                                title: res.msg,
                                icon: 'none',
                                mask: true,
                                success: () => {
                                    setTimeout(() => {
                                        Taro.navigateBack()
                                    }, 1000)
                                }
                            })
                        }
                    )
                }
            }
        })
    }
    
    render() {
        const { head_image_url, modify_quota, modify_used_count, disabled } = this.state;
        
        return (
            <View className="container">
              <AtNoticebar>{`[提示]本月修改额度${modify_quota}次, 已修改次数${modify_used_count}次`}</AtNoticebar>
              <View className="head">
                <View className="head_image">
                    {(head_image_url ? true : false) && (
                        <View onClick={this.previewHeadImage.bind(this)} style="display: flex;">
                          <Image className="image" src={head_image_url} />
                        </View>
                    )}
                    {(head_image_url ? false : true) && (
                        <View className="add" onClick={this.uploadHeadImage.bind(this)}>
                          <Image className="add_image" src={require('../../../image/add.png')}/>
                        </View>
                    )}
                </View>
              </View>
              <Button onClick={this.modifyHeadImage.bind(this)} disabled={disabled}>
                修改
              </Button>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        store: state.store || {}
    }
};

export default connect(mapStateToProps)(HeadImage)
