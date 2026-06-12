import { useState } from "react";
import { Menu, IconButton } from "react-native-paper";
import styles from "./styles";

export default function OptionsButton({ actions = [], color= "black" }) { // gives black as default color if color is not provided
    const [visible, setVisible] = useState(false);

    return (
        <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
                <IconButton
                    iconColor={color}
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