import { useState } from "react";
import { Menu, IconButton } from "react-native-paper";
import styles from "./styles";

export default function OptionsButton({ actions = [] }) {
    const [visible, setVisible] = useState(false);

    return (
        <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
                <IconButton
                    iconColor="black"
                    icon="dots-vertical"
                    onPress={() => setVisible(true)}
                />
            }
        >
            {actions.map((action, index) => (
                <Menu.Item
                    style={styles.options}
                    key={index}
                    title={action.label}
                    onPress={() => {
                        setVisible(false);
                        action.onPress();
                    }}
                />
            ))}

        </Menu>

    );
}