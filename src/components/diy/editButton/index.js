import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';

import './index.scss';

class EditButton extends Taro.Component {

	static defaultProps = {
        onEdit: () => {}
	};
	
	render() {
		const { onEdit } = this.props;
		
		return (
			<View onClick={onEdit} className='edit__btn_parent'>
				<Text className='edit__btn'>
					装饰
				</Text>
			</View>
		)
	}
}

export default EditButton