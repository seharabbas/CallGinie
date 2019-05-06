import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Image,
    Linking,
    Text,
} from 'react-native';

import Modal from "react-native-modal";
import styles from "./Styles";


class ReceiptViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            receipt: null
        }
    }
    render() {
        return (
            <Modal style={styles.modalContent}>
                <View style={styles.modalHeader}>
                    <TouchableOpacity onPress={() => { this.onCancel(this.props) }}>
                        <View>
                            <Text style={[styles.cancelContent, { color: colors.red }]}>{"Cancel"}</Text>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.addContent}>{"Receipt"}</Text>
                    </View>
                    <TouchableOpacity onPress={() => { this.onSelectedPress() }}>
                        <View>
                            <Text style={[styles.cancelContent, { marginRight: 2 }]}>{"Review"}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.fareContainer}>
                    <Text style={styles.fareHeading}>{"Fare Breakdown"}</Text>
                </View>
            </Modal>
        )
    }


}
const mapStateToProps = (state) => {
    return {

    }
};
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptViewer);
